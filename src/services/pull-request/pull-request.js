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
            committedDate
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

const extractLastEventAuthor = timeline => ({
	lastEventAuthor: (timeline && timeline.nodes && timeline.nodes[0] && timeline.nodes[0].author && timeline.nodes[0].author.login) || '',
})

const extractStatuses = ({nodes}) => {
	const {committedDate, status} = nodes[0].commit
	const {state, contexts} = status || {state: 'NO_STATUS', contexts: []}
	return {
		commitDate: new Date(committedDate),
		buildStatus: state,
		statuses: contexts.map(({context, state, targetUrl}) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl,
		})),
	}
}
