<template>
	<div class="line">
		<!-- @vue-ignore TODO remove when all underlying component migrated to composition api -->
		<repository-remover
			:name="repository.name"
			:owner="repository.owner"
			data-test="trash"
			class="repository-remover"
		/>
		<a :href="repository.repositoryUrl" data-test="link" class="link">
			<badge-status :status="repository.branchStatus">
				<span>{{ repository.name }}</span>
				<pop-over v-if="repository.statusesList.length" class="popover">
					<build-statuses :statuses="repository.statusesList" />
				</pop-over>
			</badge-status>
		</a>
	</div>
</template>

<script lang="ts" setup>
import BadgeStatus from '../badge-status/badge-status.vue'
import PopOver from '../pop-over/pop-over.vue'
import RepositoryRemover from '../../repository-remover/repository-remover.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import type { GDRepository } from '../../../types/repository'

defineProps<{
	repository: GDRepository
}>()
</script>

<style lang="css" scoped>
.line {
	position: relative;
	display: flex;
	justify-content: space-between;
}
.repository-remover {
	margin-right: 5px;
	align-self: center;
}
.link {
	width: 100%;
	text-decoration: none;
	text-transform: capitalize;
}
.popover {
	display: flex;
	flex-direction: column;
	visibility: hidden;
	opacity: 0;
	transition: 300ms ease;
}
@media (min-width: 1200px) {
	.link:hover .popover,
	.popover:hover {
		visibility: visible;
		opacity: 1;
		transition: 300ms ease;
	}
}
</style>
