<template>
	<div data-test="counter" :class="freshness">{{ counter }}s ago</div>
</template>

<script lang="ts">
export default {
	name: 'refresh-indicator',
	props: {
		promise: {
			type: Promise,
			required: true
		},
		timeBetweenRefresh: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			interval: setTimeout(() => undefined, 0),
			counter: 0
		}
	},
	watch: {
		promise() {
			this.promise.then(this.resetCounter)
		}
	},
	created() {
		this.interval = setInterval(this.incrementCounter, 1000)
	},
	computed: {
		freshness() {
			if (this.counter < this.timeBetweenRefresh) {
				return 'fresh'
			}
			if (this.counter > 2 * this.timeBetweenRefresh) {
				return 'outdated'
			}
			return 'old'
		}
	},
	methods: {
		incrementCounter() {
			this.counter++
		},
		resetCounter() {
			this.counter = 0
		}
	},
	unmounted() {
		clearInterval(this.interval)
	}
}
</script>

<style lang="postcss" scoped>
.fresh {
	color: var(--color-success);
}
.old {
	color: var(--color-old);
}
.outdated {
	color: var(--color-failure);
}
</style>
