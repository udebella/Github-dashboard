export default {
	name: `github-api-config`,
	data() {
		return {inputValue: this.$store.state.githubApi}
	},
	methods: {
		updateGithubApi() {
			this.$store.commit(`updateGithubApi`, this.inputValue)
		},
	},
}
