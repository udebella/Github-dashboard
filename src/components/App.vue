<template>
    <div>
        <settings/>
        <starred-repos username="udebella"/>
    </div>
</template>

<script>
import starredRepos from './starred-repos/starred-repos.vue'
import settings from './settings/settings.vue'

export default {
    name: `App`,
    components: {
        starredRepos,
        settings,
    },
}
</script>