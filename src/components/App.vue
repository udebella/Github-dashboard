<template>
    <div>
        <starred-repos username="udebella">
            <template slot-scope="{repository}">
                <repository-link :repository="repository"/>
            </template>
        </starred-repos>
    </div>
</template>

<script>
import starredRepos from './starred-repos/starred-repos.vue'
import repositoryLink from './repository-link/repository-link.vue'

export default {
    name: 'App',
    components: {
        starredRepos,
        repositoryLink,
    },
}
</script>