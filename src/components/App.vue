<template>
    <div>
        <starred-repos></starred-repos>
    </div>
</template>

<script>
    import starredRepos from './starred-repos/starred-repos.vue'

    export default {
        name: 'App',
        components: {
            starredRepos
        }
    }
</script>