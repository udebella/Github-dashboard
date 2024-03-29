import { shallowMount } from '@vue/test-utils'
import RepositoryRemover from './repository-remover.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import { useRepositoryStore } from '../../stores/repositories/repositories'

describe('RepositoryRemover component', () => {
	let repositoryRemover

	beforeEach(() => {
		setActivePinia(createPinia())
		repositoryRemover = shallowMount(RepositoryRemover, {
			propsData: { name: 'example', owner: 'user' },
			global: { renderStubDefaultSlot: true }
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(repositoryRemover.exists()).toBe(true)
		})

		it('should display a remove icon', async () => {
			await useConfigurationStore().$patch({ configurationEnabled: true })

			expect(repositoryRemover.findComponent('[data-test=icon]').attributes().icon).toBe('deleteBin')
		})

		it('should hide the remove icon when configuration mode is disabled', async () => {
			await useConfigurationStore().$patch({ configurationEnabled: false })

			expect(repositoryRemover.find('[data-test=icon]').exists()).toBe(false)
		})
	})

	describe('Removing a repository', () => {
		it('should remove the repository from watched repository when clicked', async () => {
			await useRepositoryStore().$patch({ watched: [{ name: 'example', owner: 'user' }] })

			await repositoryRemover.findComponent({ name: 'custom-button' }).vm.$emit('click')

			expect(useRepositoryStore().watched).toEqual([])
		})
	})
})
