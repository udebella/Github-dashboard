import { shallowMount, VueWrapper } from '@vue/test-utils'
import RepositoryAdder from './repository-adder.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigurationStore } from '@/stores/configuration'

describe('RepositoryAdder component', () => {
	let repositoryAdder: VueWrapper

	beforeEach(() => {
		setActivePinia(createPinia())
		repositoryAdder = shallowMount(RepositoryAdder, { global: { renderStubDefaultSlot: true } })
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(repositoryAdder.exists()).toBe(true)
		})

		it('should hide the component when configuration mode is disabled', async () => {
			useConfigurationStore().$patch({ configurationEnabled: false })

			repositoryAdder = shallowMount(RepositoryAdder)

			expect(repositoryAdder.find('[data-test=button]').exists()).toBe(false)
		})
	})

	describe('Adding a repository', () => {
		it('should display a debounced input', () => {
			expect(repositoryAdder.find('[data-test=owner-input]').exists()).toBe(true)
		})

		it('should hide the icon when clicked', () => {
			const icon = repositoryAdder.find('[data-test=icon]')

			repositoryAdder.findComponent({ name: 'badge' }).vm.$emit('click')

			expect(icon.exists()).toBe(false)
		})
	})
})
