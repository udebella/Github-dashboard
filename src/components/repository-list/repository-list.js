import repositoryLine from '../repository-line/repository-line.vue'

export default {
	name: `repository-list`,
	computed: {
		repositories() {
			return this.$store.state.watchedRepositories
		},
		isDisplayed() {
			return this.repositories.length !== 0
		},
	},
	components: {
		repositoryLine,
	},
}
