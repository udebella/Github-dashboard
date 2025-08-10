<template>
	<copy-button :value="store.shareString" />
</template>

<script lang="ts" setup>
import CopyButton from '../ui/copy-button/copy-button.vue'
import { useRepositoryStore } from '../../stores/repositories/repositories.ts'

const store = useRepositoryStore()
</script>

<style lang="css" scoped></style>
