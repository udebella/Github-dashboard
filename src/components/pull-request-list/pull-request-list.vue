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

<script lang="ts" setup>
import PullRequestLine from '../ui/pull-request-line/pull-request-line.vue'
import NetworkPolling from '../network-polling/network-polling.vue'
import { buildRepositoriesQuery } from '../../services/graphql/query-builder'
import {
	extractHttp as extractPullRequest,
	type GDPullRequest,
	pullRequestFragment
} from '../../services/pull-request/pull-request'
import { buildUserService } from '../../services/user/user'
import { useRepositoryStore } from '../../stores/repositories/repositories'
import { computed, inject, ref } from 'vue'
import { pullRequestNotifications as defaultPullRequestNotifications } from '../../services/pull-request-notifications/pull-request-notifications'
import { NO_USER } from '../../services/session/session.ts'

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

const queryBuilder = inject('queryBuilder', buildRepositoriesQuery(pullRequestListFragment))
const userService = inject('userService', buildUserService())
const pullRequestReader = inject('pullRequestReader', extractPullRequest)
const pullRequestNotifications = inject('pullRequestNotifications', defaultPullRequestNotifications())

const repositoryStore = useRepositoryStore()

const query = computed(() => {
	const watchedRepositories = repositoryStore.watched
	return queryBuilder(watchedRepositories)
})

const hasUpdates = (lastEventAuthor: string) => {
	const connectedUser = userService.connectedUser()
	return connectedUser !== NO_USER && connectedUser.login !== lastEventAuthor
}

const pullRequests = ref<GDPullRequest[]>([])
const updatePullRequests = (httpResponse: object) => {
	const repositories = Object.values(httpResponse).filter((repositories) => repositories && repositories.pullRequests)
	pullRequests.value = pullRequestReader(repositories)
	pullRequestNotifications.newList(pullRequests.value.map(({ prTitle, prUrl }) => ({ title: prTitle, url: prUrl })))
}
</script>

<style lang="css" scoped>
.head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
