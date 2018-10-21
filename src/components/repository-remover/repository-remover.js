import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../custom-button/custom-button.vue'

library.add(faTrash)

export default {
	name: `repository-remover`,
	props: {
		name: {
			type: String,
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
	},
	computed: {
		configurationEnabled() {
			return this.$store.state.configurationEnabled
		},
	},
	methods: {
		remove() {
			this.$store.commit(`removeRepository`, {name: this.name, owner: this.owner})
		},
	},
	components: {
		CustomButton,
	},
}
