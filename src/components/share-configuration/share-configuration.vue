<template>
	<div>
		<div class="line">
			<copy-button :value="store.shareString" />
			<paste-button @paste="store.import($event)" />
		</div>
		<pre data-test="repositories" class="preview">{{ store.watched }}</pre>
	</div>
</template>

<script lang="ts" setup>
import CopyButton from '../ui/copy-button/copy-button.vue'
import { useRepositoryStore } from '../../stores/repositories/repositories.ts'
import PasteButton from '../ui/paste-button/paste-button.vue'

const store = useRepositoryStore()
</script>

<style lang="css" scoped>
.preview {
	background-color: var(--color-surface);
	max-height: 400px;
	overflow: auto;
}

.line {
	display: flex;
	justify-content: space-between;
}
</style>
