export default {
	name: `github-api-config`,
	data() {
		return {inputValue: this.$store.state.githubApi}
	},
	computed: {
		configurationEnabled() {
			return this.$store.state.configurationEnabled
		},
	},
	methods: {
		updateGithubApi() {
			this.$store.commit(`updateGithubApi`, this.inputValue)
		},
	},
}
