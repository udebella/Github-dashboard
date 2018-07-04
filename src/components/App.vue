<template>
    <div>
        <starred-repos username="udebella">
            <template slot-scope="{repository}">
                <repository-link :repository="repository"/>
                <build-status 
                    :name="repository.name" 
                    :owner="repository.owner" 
                    :branch="repository.default_branch"/>
            </template>
        </starred-repos>
    </div>
</template>

<script>
import starredRepos from './starred-repos/starred-repos.vue'
import repositoryLink from './repository-link/repository-link.vue'
import buildStatus from './build-status/build-status.vue'

export default {
    name: 'App',
    components: {
        starredRepos,
        repositoryLink,
        buildStatus,
    },
}
</script>