import {faTrash} from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../custom-button/custom-button.vue'

export default {
	name: 'repository-remover',
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
	data: () => ({
		icon: faTrash,
	}),
	computed: {
		configurationEnabled() {
			return this.$store.state.configurationEnabled
		},
	},
	methods: {
		remove() {
			this.$store.commit('removeRepository', {name: this.name, owner: this.owner})
		},
	},
	components: {
		CustomButton,
	},
}
