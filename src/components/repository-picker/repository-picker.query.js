export const query = (searchQuery) => `{
  search(query: "${searchQuery}", type: REPOSITORY, first: 5) {
    nodes {
      ... on Repository {
        nameWithOwner
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
