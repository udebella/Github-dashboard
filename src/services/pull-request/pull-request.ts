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
            status {
            contexts {
			    state
			    context
			    targetUrl
			  }
              state
            }
          }
        }
      }
    }
}`

export const extractHttp = (repositoryList) =>
	repositoryList
		.flatMap(({ pullRequests }) =>
			pullRequests.nodes.map(({ title, url, createdAt, updatedAt, commits, timelineItems }) => ({
				prTitle: title,
				prUrl: url,
				creationDate: new Date(createdAt),
				updateDate: new Date(updatedAt),
				...extractLastEventAuthor(timelineItems),
				...extractStatuses(commits)
			}))
		)
		.sort(mostRecentFirst)

const extractLastEventAuthor = ({ nodes: [lastEvent] }) => {
	const { login } = lastEvent.author || (lastEvent.commit && lastEvent.commit.author.user) || {}
	const authorName = login
	const defaultAuthorName = ''
	return {
		lastEventAuthor: authorName || defaultAuthorName
	}
}

const extractStatuses = ({ nodes }) => {
	const { status } = nodes[0].commit
	const { state, contexts } = status || { state: 'NO_STATUS', contexts: [] }
	return {
		buildStatus: state,
		statuses: contexts.map(({ context, state, targetUrl }) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl
		}))
	}
}
