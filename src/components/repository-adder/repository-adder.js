import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Badge from '../badge/badge.vue'
import DebouncedInput from '../debounced-input/debounced-input.vue'

library.add(faPlusCircle)

export default {
	name: `repository-adder`,
	data: () => ({
		displayInput: false,
	}),
	components: {
		Badge,
		DebouncedInput,
	},
	methods: {
		clickIcon() {
			this.displayInput = true
		},
	},
}
