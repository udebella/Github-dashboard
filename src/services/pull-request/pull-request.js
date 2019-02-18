const mostRecentFirst = ({updateDate: first}, {updateDate: second}) => second.getTime() - first.getTime()

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
      timeline(last: 1) {
        nodes {
          ...on Commit {
            author {
              name
            }
          }
          ...on Comment {
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

export const extractHttp = repositoryList => repositoryList
	.flatMap(({pullRequests}) => pullRequests.nodes
		.map(({title, url, createdAt, updatedAt, commits, timeline}) => ({
			prTitle: title,
			prUrl: url,
			creationDate: new Date(createdAt),
			updateDate: new Date(updatedAt),
			...extractLastEventAuthor(timeline),
			...extractStatuses(commits),
		})))
	.sort(mostRecentFirst)

const extractLastEventAuthor = ({nodes}) => ({
	lastEventAuthor: (nodes[0].author && (nodes[0].author.login || nodes[0].author.name)) || '',
})

const extractStatuses = ({nodes}) => {
	const {status} = nodes[0].commit
	const {state, contexts} = status || {state: 'NO_STATUS', contexts: []}
	return {
		buildStatus: state,
		statuses: contexts.map(({context, state, targetUrl}) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl,
		})),
	}
}
