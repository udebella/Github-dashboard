<template>
	<div>
		<div class="head">
			<h2 data-test="title">Watched repositories</h2>
			<!-- @vue-ignore TODO remove when all underlying component migrated to composition api -->
			<network-polling data-test="polling" :query="query" @http-update="updateRepositories" />
		</div>
		<repository-line
			v-for="repository in repositories"
			:key="repository.name"
			:repository="repository"
			data-test="repository-line"
		/>
		<repository-adder data-test="repository-adder" />
	</div>
</template>

<script lang="ts" setup>
import RepositoryLine from '../repository-line/repository-line.vue'
import RepositoryAdder from '../repository-adder/repository-adder.vue'
import NetworkPolling from '../network-polling/network-polling.vue'
import { buildRepositoriesQuery } from '../../services/graphql/query-builder'
import { useRepositoryStore } from '../../stores/repositories/repositories'
import { computed, ref } from 'vue'
import type { GDBuildStatus } from '../../services/statuses/extract-statuses'
import { extractStatuses } from '../../services/statuses/extract-statuses'
import type { Commit, GitObject, Maybe, Repository } from '@octokit/graphql-schema'

type GDRepository = {
	name: string
	owner: string
	repositoryUrl: string
	branchStatus: string
	statusesList: GDBuildStatus[]
}

const extractHttpData = (httpData: Repository): GDRepository[] => {
	return Object.values(httpData)
		.filter((repositories: Repository) => repositories?.defaultBranchRef)
		.map(({ name, owner, url, defaultBranchRef }: Repository): GDRepository | null => {
			const repositoryData = defaultBranchRef?.target
			if (!isCommit(repositoryData)) {
				return null
			}
			const { buildStatus, statuses } = extractStatuses(repositoryData.statusCheckRollup)
			return {
				name: name,
				owner: owner.login,
				repositoryUrl: url,
				branchStatus: buildStatus,
				statusesList: statuses
			}
		})
		.filter((repositories: GDRepository | null): repositories is GDRepository => repositories !== null)
}

const isCommit = (value?: Maybe<GitObject>): value is Commit => {
	return Object.prototype.hasOwnProperty.call(value ?? {}, 'statusCheckRollup')
}

const repositoryListFragment = `fragment repository on Repository {
  name
  owner {
    login
  }
  url
  defaultBranchRef {
    target {
      ... on Commit {
        statusCheckRollup {
          contexts(last: 10) {
            nodes {
              ... on StatusContext {
                state
                context
                targetUrl
              }
              ... on CheckRun {
                conclusion
                name
                detailsUrl
              }
            }
          }
          state
        }
      }
    }
  }
}`

const props = withDefaults(
	defineProps<{
		queryBuilder?: ReturnType<typeof buildRepositoriesQuery>
	}>(),
	{ queryBuilder: () => buildRepositoriesQuery(repositoryListFragment) }
)

const repositoryStore = useRepositoryStore()
const repositories = ref<GDRepository[]>([])
const query = computed(() => {
	const watchedRepositories = repositoryStore.watched
	return props.queryBuilder(watchedRepositories)
})

function updateRepositories(httpData: Repository) {
	repositories.value = extractHttpData(httpData)
}
</script>
<style src="./repository-list.scss" scoped></style>
