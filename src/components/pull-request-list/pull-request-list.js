import PullRequestLine from '../pull-request-line/pull-request-line.vue'
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
		hasUpdates(lastEventAuthor) {
			return this.userService.connectedUser().login !== lastEventAuthor
		},
		updatePullRequests(httpResponse) {
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
