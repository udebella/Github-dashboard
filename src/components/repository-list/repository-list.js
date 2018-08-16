import RepositoryLine from '../repository-line/repository-line.vue'
import RepositoryAdder from '../repository-adder/repository-adder.vue'

export default {
	name: `repository-list`,
	computed: {
		repositories() {
			return this.$store.state.watchedRepositories
		},
	},
	components: {
		RepositoryLine,
		RepositoryAdder,
	},
}
