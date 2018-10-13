export const query = repositoryList => {
	if (repositoryList.length === 0) {
		return ``
	}

	const repositories = repositoryList.reduce((previous, {owner, name}) => `${previous}
  ${owner}_${name}: repository(owner: "${owner}", name: "${name}") {
    ...repository
  },`, ``)

	return `${fragment}

query {
  ${repositories}
}`
}

const fragment = `fragment repository on Repository {
  defaultBranchRef {
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
  
  facebook_react: repository(owner: "facebook", name: "react") {
    ...repository
  },
}`

export const multipleRepositoryQuery = `${fragment}

query {
  
  facebook_react: repository(owner: "facebook", name: "react") {
    ...repository
  },
  angular_angular: repository(owner: "angular", name: "angular") {
    ...repository
  },
}`
