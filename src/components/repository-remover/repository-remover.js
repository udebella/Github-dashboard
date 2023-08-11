import CustomButton from '../ui/custom-button/custom-button.vue'
import { useRepositoryStore } from '../../stores/repositories/repositories'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import IconComponent from '../ui/icon/icon-component.vue'

export default {
	setup() {
		const repositoryStore = useRepositoryStore()
		const configurationStore = useConfigurationStore()
		return { repositoryStore, configurationStore }
	},
	name: 'repository-remover',
	props: {
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		}
	},
	data: () => ({
		icon: 'deleteBin'
	}),
	computed: {
		configurationEnabled() {
			return this.configurationStore.configurationEnabled
		}
	},
	methods: {
		remove() {
			this.repositoryStore.removeRepository({ name: this.name, owner: this.owner })
		}
	},
	components: {
		IconComponent,
		CustomButton
	}
}
