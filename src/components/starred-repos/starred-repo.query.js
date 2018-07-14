export const query = `query { 
  viewer { 
    login
    starredRepositories(first: 20) {
      nodes {
        name,
        owner {
            login
        },
        url,
        defaultBranchRef {
          name
        }
      }
    }
  }
}`