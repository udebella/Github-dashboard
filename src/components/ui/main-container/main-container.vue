<template>
	<div class="container">
		<github-api-config class="configuration" />
		<div class="columns">
			<repository-list class="repository-list" />
			<!-- @vue-ignore TODO remove when migrated to composition api -->
			<pull-request-list class="pull-request-list" />
			<div class="viewer-pull-request-list">
				<!-- @vue-ignore TODO remove when migrated to composition api -->
				<viewer-pull-request-list />
				<!-- @vue-ignore TODO remove when migrated to composition api -->
				<recently-closed-pull-requests />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import GithubApiConfig from '../../github-api-config/github-api-config.vue'
import RepositoryList from '../../repository-list/repository-list.vue'
import PullRequestList from '../../pull-request-list/pull-request-list.vue'
import ViewerPullRequestList from '../../viewer-pull-request-list/viewer-pull-request-list.vue'
import RecentlyClosedPullRequests from '../../recently-closed-pull-requests/recently-closed-pull-requests.vue'
</script>

<style lang="scss" scoped>
// TODO find a way to migrate media query to native css
@import '../../../global';

.container {
	margin: 10px;
	display: flex;
	flex-direction: column;
}

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
}

.viewer-pull-request-list {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>
