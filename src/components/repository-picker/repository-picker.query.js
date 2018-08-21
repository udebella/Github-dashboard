export const query = username => `{
  repositoryOwner(login: ${username}) {
  	repositories(first: 20) {
      nodes {
        name
        owner {
          login
        }
        url
        defaultBranchRef {
          name
        }
      }
    }
  }
}`
