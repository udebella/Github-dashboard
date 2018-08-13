export const query = ({owner, repository, branch}) => `query { 
  repository(owner: "${owner}", name: "${repository}") {
    ...on Repository {
      ref(qualifiedName: "${branch}") {
        target {
          ...on Commit {
            status {
              contexts {
                state,
                context,
                targetUrl
              },
              state
            }
          }
        }
      }
    }
  }
}`