import type {
	CheckRun,
	Maybe,
	PullRequest,
	PullRequestCommit,
	PullRequestCommitConnection,
	PullRequestReview,
	PullRequestTimelineItems,
	PullRequestTimelineItemsConnection,
	Repository,
	StatusCheckRollupContext,
	StatusContext
} from '@octokit/graphql-schema'

type GDPullRequest = {
	prTitle: string
	prUrl: string
	creationDate: Date
	updateDate: Date
} & GDPullRequestStatus &
	GDLastEventAuthor

type GDLastEventAuthor = {
	lastEventAuthor: string
}

type GDPullRequestStatus = {
	buildStatus: string
	statuses: GDBuildStatus[]
}

type GDBuildStatus = {
	description: string
	jobStatus: string
	jobUrl: string
}

const mostRecentFirst = ({ updateDate: first }: GDPullRequest, { updateDate: second }: GDPullRequest) =>
	second.getTime() - first.getTime()

export const pullRequestFragment = `fragment PullRequest on PullRequestConnection {
  nodes {
      title
      url
      comments {
        totalCount
      }
      createdAt
      updatedAt
      state
      timelineItems(last: 1, itemTypes: [PULL_REQUEST_COMMIT, PULL_REQUEST_REVIEW]) {
        nodes {
		  ...on PullRequestCommit {
			commit {
			  author {
				name
			  }
			}
		  }
		  ...on PullRequestReview {
			author {
			  login
			}
		  }
        }
      }
      commits(last: 1) {
        nodes {
          commit {
            statusCheckRollup {
            contexts(last: 10) {
            	nodes {
					...on StatusContext {
                      state
                      context
                      targetUrl
                    }
                    ...on CheckRun {
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
    }
}`

export const extractHttp = (repositoryList: Repository[]) =>
	repositoryList.flatMap((repository) => repository.pullRequests.nodes!.map(extractPullRequest)).sort(mostRecentFirst)

const extractPullRequest = (pullRequest: Maybe<PullRequest>): GDPullRequest => {
	const { title, url, createdAt, updatedAt, commits, timelineItems } = pullRequest!
	return {
		prTitle: title,
		prUrl: url,
		creationDate: new Date(createdAt),
		updateDate: new Date(updatedAt),
		...extractLastEventAuthor(timelineItems),
		...extractStatuses(commits)
	}
}

const extractLastEventAuthor = ({ nodes }: PullRequestTimelineItemsConnection): GDLastEventAuthor => {
	const lastEvent = nodes?.[0]
	if (isReview(lastEvent)) {
		const { login } = lastEvent.author!
		return {
			lastEventAuthor: login
		}
	}
	if (isCommit(lastEvent)) {
		return {
			lastEventAuthor: lastEvent?.commit.author?.name ?? ''
		}
	}
	return {
		lastEventAuthor: ''
	}
}

const extractStatuses = ({ nodes }: PullRequestCommitConnection): GDPullRequestStatus => {
	const { state, contexts } = nodes?.[0]?.commit.statusCheckRollup ?? { state: 'NO_STATUS', contexts: { nodes: [] } }
	return {
		buildStatus: state,
		statuses: contexts?.nodes?.map(extractStatusesDetails) ?? []
	}
}

const extractStatusesDetails = (rollupContext: Maybe<StatusCheckRollupContext>): GDBuildStatus => {
	const status = rollupContext!
	if (isStatus(status)) {
		return {
			description: status.context,
			jobStatus: status.state,
			jobUrl: status.targetUrl
		}
	}
	return {
		description: status.name,
		jobStatus: status.conclusion ?? 'PENDING',
		jobUrl: status.detailsUrl
	}
}

const isStatus = (context: StatusContext | CheckRun): context is StatusContext => {
	return 'context' in context
}

const isReview = (node?: Maybe<PullRequestTimelineItems>): node is PullRequestReview => {
	return Object.prototype.hasOwnProperty.call(node ?? {}, 'author')
}

const isCommit = (node?: Maybe<PullRequestTimelineItems>): node is PullRequestCommit => {
	return Object.prototype.hasOwnProperty.call(node ?? {}, 'commit')
}
