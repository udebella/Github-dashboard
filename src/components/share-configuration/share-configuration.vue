<template>
	<copy-button :value="store.shareString" />
	<paste-button @paste="store.import($event)" />
	<pre data-test="repositories">{{ store.watched }}</pre>
</template>

<script lang="ts" setup>
import CopyButton from '../ui/copy-button/copy-button.vue'
import { useRepositoryStore } from '../../stores/repositories/repositories.ts'
import PasteButton from '../ui/paste-button/paste-button.vue'

const store = useRepositoryStore()
</script>

<style lang="css" scoped></style>
