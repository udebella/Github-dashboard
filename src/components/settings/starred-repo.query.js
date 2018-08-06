export const query = username => `{
  user(login: ${username}) {
    starredRepositories(first: 20) {
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
    }, repositories(first: 20) {
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
