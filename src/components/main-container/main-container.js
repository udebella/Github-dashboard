import GithubApiConfig from '../github-api-config/github-api-config.vue'
import RepositoryList from '../repository-list/repository-list.vue'
import PullRequestList from '../pull-request-list/pull-request-list.vue'
import ViewerPullRequestList from '../viewer-pull-request-list/viewer-pull-request-list.vue'

export default {
	name: `main-container`,
	components: {
		GithubApiConfig,
		RepositoryList,
		PullRequestList,
		ViewerPullRequestList,
	},
}
