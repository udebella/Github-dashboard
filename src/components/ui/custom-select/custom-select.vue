<template>
	<select v-if="items.length" v-model="selected" data-test="select" @change="notify">
		<option disabled value="" />
		<option v-for="item in items" :key="item" :value="item">
			{{ item }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'custom-select',
	props: {
		items: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		selected: ''
	}),
	methods: {
		notify() {
			this.$emit('selected', this.selected)
		}
	}
}
</script>
<style src="./custom-select.scss" scoped></style>
