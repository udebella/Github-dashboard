export default {
	name: 'refresh-indicator',
	data() {
		return {
			counter: 0,
		}
	},
	created() {
		setInterval(this.incrementCounter, 1000)
	},
	methods: {
		incrementCounter() {
			this.counter++
		},
	},
}
