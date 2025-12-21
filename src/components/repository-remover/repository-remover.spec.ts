import { shallowMount } from '@vue/test-utils'
import RepositoryRemover from './repository-remover.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import { useRepositoryStore } from '../../stores/repositories/repositories'
import type { Wrapper } from '../../test-utils.ts'
import Icon from '../ui/icon/icon-component.vue'

describe('RepositoryRemover component', () => {
	let repositoryRemover: Wrapper<typeof RepositoryRemover>

	beforeEach(() => {
		setActivePinia(createPinia())
		repositoryRemover = shallowMount(RepositoryRemover, { props: { name: 'example', owner: 'user' } })
	})

	it('displays a remove icon', async () => {
		await useConfigurationStore().$patch({ configurationEnabled: true })

		expect(repositoryRemover.findComponent(Icon).attributes().icon).toBe('deleteBin')
	})

	it('hides the remove icon when configuration mode is disabled', async () => {
		await useConfigurationStore().$patch({ configurationEnabled: false })

		expect(repositoryRemover.findComponent(Icon).exists()).toBe(false)
	})

	it('removes the repository from watched repository when clicked', async () => {
		await useRepositoryStore().$patch({ watched: [{ name: 'example', owner: 'user' }] })

		await repositoryRemover.findComponent({ name: 'custom-button' }).vm.$emit('click')

		expect(useRepositoryStore().watched).toEqual([])
	})
})
