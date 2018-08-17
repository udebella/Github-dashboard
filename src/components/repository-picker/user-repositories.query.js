export const query = username => `{
  user(login: ${username}) {
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
