export const query = username => `{
  repositoryOwner(login: ${username}) {
  	repositories(first: 20, orderBy: {field: STARGAZERS, direction: DESC}) {
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
