import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Badge from '../badge/badge.vue'
import RepositoryPicker from '../repository-picker/repository-picker.vue'

library.add(faPlusCircle)

export default {
	name: `repository-adder`,
	data: () => ({
		displayInput: false,
	}),
	methods: {
		clickIcon() {
			this.displayInput = true
		},
	},
	components: {
		Badge,
		RepositoryPicker,
	},
}
