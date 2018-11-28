import Badge from '../badge/badge.vue'
import RepositoryPicker from '../repository-picker/repository-picker.vue'

export default {
	name: 'repository-adder',
	computed: {
		configurationEnabled() {
			return this.$store.state.configurationEnabled
		},
	},
	components: {
		Badge,
		RepositoryPicker,
	},
}
