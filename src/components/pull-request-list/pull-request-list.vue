<template>
	<div>
		<div class="head">
			<h2 data-test="title">Pull requests on watched repositories</h2>
			<network-polling data-test="network-polling" :query="query" @http-update="updatePullRequests" />
		</div>
		<pull-request-line
			v-for="{
				prTitle,
				prUrl,
				buildStatus,
				creationDate,
				statuses,
				lastEventAuthor,
				repositoryName
			} in pullRequests"
			:key="prUrl"
			:has-updates="hasUpdates(lastEventAuthor)"
			:title="prTitle"
			:url="prUrl"
			:repository-name="repositoryName"
			:build-status="buildStatus"
			:creation-date="creationDate"
			:statuses-list="statuses"
			data-test="line"
		/>
	</div>
</template>

<script lang="ts">
import PullRequestLine from '../ui/pull-request-line/pull-request-line.vue'
import NetworkPolling from '../network-polling/network-polling.vue'
import { buildRepositoriesQuery } from '../../services/graphql/query-builder'
import { extractHttp as extractPullRequest, pullRequestFragment } from '../../services/pull-request/pull-request'
import { buildUserService } from '../../services/user/user'
import { pullRequestNotifications } from '../../services/pull-request-notifications/pull-request-notifications'
import { useRepositoryStore } from '../../stores/repositories/repositories'

const pullRequestListFragment = `${pullRequestFragment}
fragment repository on Repository {
  name
  owner {
    login
  }
  url
  pullRequests(states: OPEN, last: 10) {
    ...PullRequest
  }
}`

export default {
	setup() {
		const repositoryStore = useRepositoryStore()
		return { repositoryStore }
	},
	name: 'pull-request-list',
	props: {
		queryBuilder: {
			type: Function,
			default: buildRepositoriesQuery(pullRequestListFragment)
		},
		pullRequestReader: {
			type: Function,
			default: extractPullRequest
		},
		userService: {
			type: Object,
			default: () => buildUserService()
		},
		pullRequestNotifications: {
			type: Object,
			default: () => pullRequestNotifications()
		}
	},
	data() {
		return {
			pullRequests: []
		}
	},
	computed: {
		query() {
			const watchedRepositories = this.repositoryStore.watched
			return this.queryBuilder(watchedRepositories)
		}
	},
	methods: {
		hasUpdates(lastEventAuthor: string) {
			return this.userService.connectedUser().login !== lastEventAuthor
		},
		updatePullRequests(httpResponse: object) {
			const repositories = Object.values(httpResponse).filter(
				(repositories) => repositories && repositories.pullRequests
			)
			this.pullRequests = this.pullRequestReader(repositories)
			this.pullRequestNotifications.newList(
				this.pullRequests.map(({ prTitle, prUrl }) => ({ title: prTitle, url: prUrl }))
			)
		}
	},
	components: {
		PullRequestLine,
		NetworkPolling
	}
}
</script>

<style lang="css" scoped>
.head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
