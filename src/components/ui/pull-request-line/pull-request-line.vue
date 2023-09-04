<template>
	<a :href="url" data-test="link" class="link">
		<badge-status :status="buildStatus" class="line">
			<div class="title">
				{{ title }}
			</div>
			<div class="icons">
				<update-icon v-if="hasUpdates" />
				<living-icon :date="creationDate" />
			</div>
			<pop-over v-if="statusesList.length" side="left" class="popover">
				<build-statuses :statuses="statusesList" />
			</pop-over>
		</badge-status>
	</a>
</template>

<script lang="ts" setup>
import LivingIcon from '../living-icon/living-icon.vue'
import UpdateIcon from '../update-icon/update-icon.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import BadgeStatus from '../badge-status/badge-status.vue'
import PopOver from '../pop-over/pop-over.vue'
import type { GDBuildStatus, GDJobStatus } from '../../../services/statuses/extract-statuses'

withDefaults(
	defineProps<{
		title: string
		url: string
		buildStatus: GDJobStatus
		creationDate: Date
		hasUpdates: boolean
		statusesList?: GDBuildStatus[]
	}>(),
	{ statusesList: () => [] }
)
</script>
<style lang="scss" scoped>
@import '../../../global';

.link {
	text-decoration: none;

	.line {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.title {
			max-width: 90%;
		}

		.icons {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			*:not(:first-child) {
				margin-left: 5px;
			}
		}

		.popover {
			display: flex;
			flex-direction: column;
			visibility: hidden;
			opacity: 0;
			transition: 300ms ease;
		}

		@include on-desktop {
			&:hover .popover,
			.popover:hover {
				visibility: visible;
				opacity: 1;
				transition: 300ms ease;
			}
		}
	}
}
</style>
