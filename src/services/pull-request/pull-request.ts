import type {
	Maybe,
	PullRequest,
	PullRequestCommit,
	PullRequestReview,
	PullRequestTimelineItems,
	PullRequestTimelineItemsConnection,
	Repository
} from '@octokit/graphql-schema'
import type { GDPullRequestStatus } from '../statuses/extract-statuses'
import { extractStatuses } from '../statuses/extract-statuses'

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
		...extractStatuses(commits.nodes?.[0]?.commit.statusCheckRollup)
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

const isReview = (node?: Maybe<PullRequestTimelineItems>): node is PullRequestReview => {
	return Object.prototype.hasOwnProperty.call(node ?? {}, 'author')
}

const isCommit = (node?: Maybe<PullRequestTimelineItems>): node is PullRequestCommit => {
	return Object.prototype.hasOwnProperty.call(node ?? {}, 'commit')
}
