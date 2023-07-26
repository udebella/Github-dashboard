<template>
	<i :class="iconClass"/>
</template>

<script lang="ts" setup>
import 'remixicon/fonts/remixicon.css'

type IconsNames = 'warning' | 'error'
type IconClass = `ri-${string}-fill`

const iconClasses: Record<IconsNames, IconClass> = {
	error: 'ri-close-circle-fill',
	warning: 'ri-error-warning-fill',
}

const props = defineProps<{
	icon: IconsNames
}>()

const iconClass = iconClasses[props.icon]
</script>
