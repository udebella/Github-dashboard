import type {
	CheckRun,
	Maybe,
	PullRequestCommit,
	PullRequestCommitConnection,
	PullRequestReview,
	PullRequestTimelineItems,
	PullRequestTimelineItemsConnection,
	Repository,
	StatusCheckRollupContext,
	StatusContext
} from '@octokit/graphql-schema'

type BuildStatus = {
	description: string
	jobStatus: string
	jobUrl: string
}

const mostRecentFirst = ({ updateDate: first }, { updateDate: second }) => second.getTime() - first.getTime()

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
				user {
				  login
				}
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
	repositoryList
		.flatMap(
			({ pullRequests }) =>
				pullRequests.nodes?.map(({ title, url, createdAt, updatedAt, commits, timelineItems }) => ({
					prTitle: title,
					prUrl: url,
					creationDate: new Date(createdAt),
					updateDate: new Date(updatedAt),
					...extractLastEventAuthor(timelineItems),
					...extractStatuses(commits)
				}))
		)
		.sort(mostRecentFirst)

const extractLastEventAuthor = ({ nodes }: PullRequestTimelineItemsConnection) => {
	const lastEvent = nodes?.[0]
	if (isReview(lastEvent)) {
		const { login } = lastEvent.author!
		return {
			lastEventAuthor: login
		}
	}
	if (isCommit(lastEvent)) {
		const { login } = lastEvent!.commit.author!.user!
		return {
			lastEventAuthor: login
		}
	}
	return {
		lastEventAuthor: ''
	}
}

const extractStatuses = ({ nodes }: PullRequestCommitConnection) => {
	const { state, contexts } = nodes?.[0]?.commit.statusCheckRollup ?? { state: 'NO_STATUS', contexts: { nodes: [] } }
	return {
		buildStatus: state,
		statuses: contexts?.nodes?.map(extractStatusesDetails)
	}
}

const extractStatusesDetails = (rollupContext: Maybe<StatusCheckRollupContext>): BuildStatus => {
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
