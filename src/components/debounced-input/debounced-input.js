import {debounce} from "debounce"

export default {
	name: `debounced-input`,
	data: () => ({
		input: ``,
	}),
	watch: {
		input() {
			this.debouncedInput()
		},
	},
	created() {
		const notifyParent = () => {
			this.$emit(`input`, this.input)
		}

		this.debouncedInput = debounce(notifyParent, 1000)
	},
}
