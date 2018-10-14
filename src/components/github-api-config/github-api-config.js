export default {
	name: `github-api-config`,
	data() {
		return {inputValue: this.$store.state.githubApi}
	},
	computed: {
		configurationMode() {
			return this.$store.state.configurationEnabled
		},
	},
	methods: {
		updateGithubApi() {
			this.$store.commit(`updateGithubApi`, this.inputValue)
		},
	},
}
