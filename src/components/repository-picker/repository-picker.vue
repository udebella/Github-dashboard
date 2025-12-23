<template>
	<div>
		<debounced-input placeholder="Search query" @input="retrieveRepositoriesFor" />
		<custom-select :items="repositoriesNames" @selected="pickRepository" />
	</div>
</template>

<script lang="ts" setup>
import { buildRequest } from '../../services/graphql/graphql-client.ts'
import DebouncedInput from '../ui/debounced-input/debounced-input.vue'
import CustomSelect from '../ui/custom-select/custom-select.vue'
import { query } from './repository-picker.query.ts'
import { type Repository, useRepositoryStore } from '../../stores/repositories/repositories'
import { computed, inject, ref } from 'vue'

export type Response = {
	search?: {
		nodes?: ResponseRepository[]
	}
}
type ResponseRepository = {
	name: string
	owner: { login: string }
	url: string
	defaultBranchRef: { name: string } // FIXME defaultBranchRef can be null on new projects
}
const extract = (response?: Response): Repository[] => {
	const repositories = (response && response.search && response.search.nodes) ?? []
	return repositories.map(({ name, owner, url, defaultBranchRef }) => ({
		name,
		owner: owner.login,
		url,
		defaultBranch: defaultBranchRef.name
	}))
}

const repositoryStore = useRepositoryStore()

const request = inject('request', buildRequest<Response>())

const repositories = ref<Repository[]>([])
const repositoriesNames = computed(() => repositories.value.map(({ name }) => name))

const retrieveRepositoriesFor = async (searchQuery: string) => {
	if (searchQuery) {
		const response = await request(query(searchQuery))
		repositories.value = extract(response)
	}
}

const pickRepository = (value: string) => {
	const selectedRepository = repositories.value.find(({ name }) => name === value)
	if (selectedRepository) {
		repositoryStore.addRepository(selectedRepository)
	}
}
</script>
