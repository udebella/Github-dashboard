<template>
	<a :href="url" data-test="link" class="link">
		<badge-status :status="buildStatus" class="line" data-test="name">
			<div class="title">
				{{ title }}
			</div>
			<div class="icons">
				<update-icon v-if="hasUpdates" data-test="update-icon" />
				<living-icon :date="creationDate" data-test="living-icon" />
			</div>
			<pop-over v-if="statusesList.length" side="left" class="popover">
				<build-statuses :statuses="statusesList" />
			</pop-over>
		</badge-status>
	</a>
</template>

<script>
import LivingIcon from '../living-icon/living-icon.vue'
import UpdateIcon from '../update-icon/update-icon.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import BadgeStatus from '../badge-status/badge-status.vue'
import PopOver from '../pop-over/pop-over.vue'

export default {
	name: 'pull-request-line',
	props: {
		title: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		buildStatus: {
			type: String,
			required: true
		},
		creationDate: {
			type: Date,
			required: true
		},
		hasUpdates: {
			type: Boolean,
			required: true
		},
		statusesList: {
			type: Array,
			default: () => []
		}
	},
	components: {
		BadgeStatus,
		LivingIcon,
		UpdateIcon,
		BuildStatuses,
		PopOver
	}
}
</script>
<style src="./pull-request-line.scss" scoped></style>
