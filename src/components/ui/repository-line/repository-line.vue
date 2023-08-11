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
			<badge-status :status="repository.branchStatus" data-test="badge">
				<span>{{ repository.name }}</span>
				<pop-over v-if="repository.statusesList.length" class="popover">
					<!-- @vue-ignore TODO remove when all underlying component migrated to composition api -->
					<build-statuses :statuses="repository.statusesList" />
				</pop-over>
			</badge-status>
		</a>
	</div>
</template>

<script lang="ts">
import BadgeStatus from '../badge-status/badge-status.vue'
import PopOver from '../pop-over/pop-over.vue'
import RepositoryRemover from '../../repository-remover/repository-remover.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'

export default {
	name: 'repository-line',
	props: {
		repository: {
			required: true,
			type: Object
		}
	},
	components: {
		BadgeStatus,
		PopOver,
		RepositoryRemover,
		BuildStatuses
	}
}
</script>
<style src="./repository-line.scss" scoped></style>
