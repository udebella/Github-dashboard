import CustomButton from '../custom-button/custom-button.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCog} from '@fortawesome/free-solid-svg-icons'

library.add(faCog)

export default {
	name: `configuration`,
	computed: {
		configurationMode() {
			return this.$store.state.configurationEnabled ? `enabled` : `disabled`
		},
	},
	methods: {
		toggleConfiguration() {
			this.$store.commit(`toggleConfiguration`)
		},
	},
	components: {
		CustomButton,
	},
}
