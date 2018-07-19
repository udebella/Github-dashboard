<template>
    <div>
        <starred-repos username="udebella"/>
    </div>
</template>

<script>
import starredRepos from './starred-repos/starred-repos.vue'

export default {
    name: 'App',
    components: {
        starredRepos,
    },
}
</script>