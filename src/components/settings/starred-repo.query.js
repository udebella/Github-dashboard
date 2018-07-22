export const query = username => `{
  user(login: ${username}) {
    starredRepositories(first: 5) {
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
    }, repositories(first: 5) {
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
}
`