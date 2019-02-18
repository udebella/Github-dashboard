import GithubApiConfig from '../github-api-config/github-api-config.vue'
import RepositoryList from '../repository-list/repository-list.vue'
import PullRequestList from '../pull-request-list/pull-request-list.vue'
import ViewerPullRequestList from '../viewer-pull-request-list/viewer-pull-request-list.vue'
import RecentlyClosedPullRequests from '../recently-closed-pull-requests/recently-closed-pull-requests.vue'

export default {
	name: 'main-container',
	components: {
		GithubApiConfig,
		RepositoryList,
		PullRequestList,
		ViewerPullRequestList,
		RecentlyClosedPullRequests,
	},
}
