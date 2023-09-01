<template>
	<div class="container">
		<github-api-config class="configuration" />
		<div class="columns">
			<repository-list class="repository-list" />
			<pull-request-list class="pull-request-list" />
			<div class="viewer-pull-request-list">
				<viewer-pull-request-list />
				<recently-closed-pull-requests />
			</div>
		</div>
	</div>
</template>

<script>
import GithubApiConfig from '../../github-api-config/github-api-config.vue'
import RepositoryList from '../../repository-list/repository-list.vue'
import PullRequestList from '../../pull-request-list/pull-request-list.vue'
import ViewerPullRequestList from '../../viewer-pull-request-list/viewer-pull-request-list.vue'
import RecentlyClosedPullRequests from '../../recently-closed-pull-requests/recently-closed-pull-requests.vue'

export default {
	name: 'main-container',
	components: {
		GithubApiConfig,
		RepositoryList,
		PullRequestList,
		ViewerPullRequestList,
		RecentlyClosedPullRequests
	}
}
</script>
<style src="./main-container.scss" scoped></style>
