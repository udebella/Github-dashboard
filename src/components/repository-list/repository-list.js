import RepositoryLine from '../repository-line/repository-line.vue'

export default {
	name: `repository-list`,
	computed: {
		repositories() {
			return this.$store.state.watchedRepositories
		},
	},
	components: {
		RepositoryLine,
	},
}
