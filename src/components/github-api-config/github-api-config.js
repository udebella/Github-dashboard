export default {
	name: `github-api-config`,
	data: () => ({
		inputValue: ``,
	}),
	methods: {
		updateGithubApi() {
			this.$store.commit(`updateGithubApi`, this.inputValue)
		},
	},
}
