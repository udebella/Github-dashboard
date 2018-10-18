import {rateLimitFragment} from "../../services/graphql/fragments"

const pullRequestFragment = `fragment repository on Repository {
  name
  owner {
    login
  }
  url
  pullRequests(states: OPEN, first: 20) {
    nodes {
      title
      url
      comments {
        totalCount
      }
      reviews(first: 1) {
        totalCount
      }
      state
      commits(last: 1) {
        nodes {
          commit {
            status {
              state
            }
          }
        }
      }
    }
  }
}`

export const query = repositoryList => {
	if (repositoryList.length === 0) {
		return ``
	}

	let counter = 0
	const repositories = repositoryList.reduce((previous, {owner, name}) => `${previous}
  rep_${counter++}: repository(owner: "${owner}", name: "${name}") {
    ...repository
  },`, ``)

	return `${rateLimitFragment}
${pullRequestFragment}

query {
  ...rateLimit
  ${repositories}
}`
}


export const simpleQuery = `${rateLimitFragment}
${pullRequestFragment}

query {
  ...rateLimit
  
  rep_0: repository(owner: "facebook", name: "react") {
    ...repository
  },
}`

export const multipleRepositoryQuery = `${rateLimitFragment}
${pullRequestFragment}

query {
  ...rateLimit
  
  rep_0: repository(owner: "facebook", name: "react") {
    ...repository
  },
  rep_1: repository(owner: "angular", name: "angular") {
    ...repository
  },
}`
