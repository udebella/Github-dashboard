export default {
	name: 'refresh-indicator',
	props: {
		promise: {
			type: Promise,
			required: true,
		},
	},
	data() {
		return {
			counter: 0,
		}
	},
	watch: {
		promise() {
			this.promise.then(this.resetCounter)
		},
	},
	created() {
		setInterval(this.incrementCounter, 1000)
	},
	methods: {
		incrementCounter() {
			this.counter++
		},
		resetCounter() {
			this.counter = 0
		},
	},
}
