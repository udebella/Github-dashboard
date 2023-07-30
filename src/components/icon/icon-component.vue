<template>
	<i :class="iconClass" />
</template>

<script lang="ts" setup>
import 'remixicon/fonts/remixicon.css'

type IconsNames =
	| 'success'
	| 'pending'
	| 'warning'
	| 'error'
	| 'living'
	| 'dead'
	| 'hasUpdates'
	| 'user'
	| 'github'
	| 'deleteBin'
	| 'configuration'
type IconClass = `ri-${string}-fill`

const iconClasses: Record<IconsNames, IconClass> = {
	success: 'ri-checkbox-circle-fill',
	pending: 'ri-time-fill',
	error: 'ri-close-circle-fill',
	warning: 'ri-error-warning-fill',
	living: 'ri-heart-fill',
	dead: 'ri-skull-fill',
	hasUpdates: 'ri-eye-fill',
	user: 'ri-user-fill',
	github: 'ri-github-fill',
	deleteBin: 'ri-delete-bin-fill',
	configuration: 'ri-settings-5-fill'
}

const props = defineProps<{
	icon: IconsNames
}>()

const iconClass = iconClasses[props.icon]
</script>
