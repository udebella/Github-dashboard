<template>
    <div>
        <starred-repos username="udebella">
            <template slot-scope="{repository}">
                <repository-link :repository="repository"/>
                <branch-status
                    :name="repository.name"
                    :owner="repository.owner"
                    :branch="repository.defaultBranch"/>
            </template>
        </starred-repos>
    </div>
</template>

<script>
import starredRepos from './starred-repos/starred-repos.vue'
import repositoryLink from './repository-link/repository-link.vue'
import branchStatus from './branch-status/branch-status.vue'

export default {
    name: 'App',
    components: {
        starredRepos,
        repositoryLink,
        branchStatus,
    },
}
</script>