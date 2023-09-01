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

<style lang="scss" scoped>
@import '../../../global';

.container {
	margin: 10px;
	display: flex;
	flex-direction: column;

	.configuration {
		margin-bottom: 10px;
	}

	.columns {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		@include on-mobile {
			flex-direction: column;

			.repository-list {
				margin-bottom: 10px;
			}

			.pull-request-list {
				margin-bottom: 10px;
			}
		}

		@include on-desktop {
			.repository-list {
				width: 19%;
			}

			.pull-request-list {
				width: 39%;
			}

			.viewer-pull-request-list {
				width: 39%;
			}
		}

		.viewer-pull-request-list *:not(:first-child) {
			margin-top: 20px;
		}
	}
}
</style>
