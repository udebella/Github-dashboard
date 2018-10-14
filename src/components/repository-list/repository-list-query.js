export const query = repositoryList => {
	if (repositoryList.length === 0) {
		return ``
	}

	let counter = 0
	const repositories = repositoryList.reduce((previous, {owner, name}) => `${previous}
  rep_${counter++}: repository(owner: "${owner}", name: "${name}") {
    ...repository
  },`, ``)

	return `${fragment}

query {
  ${repositories}
}`
}

const fragment = `fragment repository on Repository {
  name,
  owner {
    login
  },
  url,
  defaultBranchRef {
  	name,
	target {
	  ... on Commit {
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
}`

export const simpleQuery = `${fragment}

query {
  
  rep_0: repository(owner: "facebook", name: "react") {
    ...repository
  },
}`

export const multipleRepositoryQuery = `${fragment}

query {
  
  rep_0: repository(owner: "facebook", name: "react") {
    ...repository
  },
  rep_1: repository(owner: "angular", name: "angular") {
    ...repository
  },
}`
