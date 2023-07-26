import CustomButton from '../custom-button/custom-button.vue'
import {useRepositoryStore} from "@/stores/repositories";
import IconComponent from "@/components/icon/icon-component.vue";
import {useConfigurationStore} from "@/stores/configuration";

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
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		icon: 'delete-bin',
	}),
	computed: {
		configurationEnabled() {
			return this.configurationStore.configurationEnabled
		},
	},
	methods: {
		remove() {
			this.repositoryStore.removeRepository({name: this.name, owner: this.owner})
		},
	},
	components: {
		IconComponent,
		CustomButton,
	},
}
