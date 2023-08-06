<template>
	<div>
		<div class="head">
			<h2 data-test="title">Watched repositories</h2>
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

<script lang="js" setup>
import RepositoryLine from '../repository-line/repository-line.vue'
import RepositoryAdder from '../repository-adder/repository-adder.vue'
import NetworkPolling from '../network-polling/network-polling.vue'
import { buildRepositoriesQuery } from '../../services/graphql/query-builder'
import { useRepositoryStore } from '../../stores/repositories'
import { computed, ref } from 'vue'
import { extractStatuses } from '../../services/statuses/extract-statuses'

const extractHttpData = ({ httpData }) => {
	return Object.values(httpData)
		.filter((repositories) => repositories?.defaultBranchRef)
		.map(({ name, owner, url, defaultBranchRef }) => {
			const repositoryData = defaultBranchRef.target.statusCheckRollup || {}
			const { buildStatus, statuses } = extractStatuses(repositoryData)
			return {
				name: name,
				owner: owner.login,
				repositoryUrl: url,
				branchStatus: buildStatus,
				statusesList: statuses
			}
		})
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

const props = defineProps({
	queryBuilder: {
		type: Function,
		default: buildRepositoriesQuery(repositoryListFragment)
	}
})

const repositoryStore = useRepositoryStore()
const repositories = ref([])
const query = computed(() => {
	const watchedRepositories = repositoryStore.watched
	return props.queryBuilder(watchedRepositories)
})

function updateRepositories(httpData) {
	repositories.value = extractHttpData({ httpData })
}
</script>
<style src="./repository-list.scss" scoped></style>
