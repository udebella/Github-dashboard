import { flushPromises, shallowMount } from '@vue/test-utils'
import RepositoryPicker from './repository-picker.vue'
import { query } from './repository-picker.query'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useRepositoryStore } from '../../stores/repositories/repositories'

const fakeResponse = {
	search: {
		nodes: [
			{
				nameWithOwner: 'facebook/react',
				name: 'react',
				owner: {
					login: 'facebook'
				},
				url: 'https://github.com/facebook/react',
				defaultBranchRef: {
					name: 'master'
				}
			}
		]
	}
}

describe('RepositoryPicker component', () => {
	let repositoryPicker, mocks

	beforeEach(() => {
		setActivePinia(
			createTestingPinia({
				createSpy: vitest.fn
			})
		)
		mocks = {
			request: vitest.fn()
		}
		repositoryPicker = shallowMount(RepositoryPicker, { propsData: mocks })
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(repositoryPicker.exists()).toBe(true)
		})

		it('should display a input to enter repository owner', () => {
			expect(repositoryPicker.find('[data-test=search-input]').exists()).toBe(true)
		})
	})

	describe('Enter repository owner', () => {
		it('should make a request to retrieve repositories of the owner', async () => {
			expect(mocks.request).not.toHaveBeenCalled()
			await repositoryPicker.findComponent('[data-test=search-input]').vm.$emit('input', 'test')

			expect(mocks.request).toHaveBeenCalledWith(query('test'))
		})

		it('should display a select to allow user to pick a repository', async () => {
			mocks.request.mockReturnValue(fakeResponse)
			repositoryPicker = shallowMount(RepositoryPicker, {
				propsData: mocks
			})

			await repositoryPicker.findComponent('[data-test=search-input]').vm.$emit('input', 'test')

			await flushPromises()
			expect(repositoryPicker.find('[data-test=repository-input]').attributes().items).toEqual('react')
		})

		it('should not make queries when update value is empty', async () => {
			await repositoryPicker.findComponent('[data-test=search-input]').vm.$emit('input', '')

			expect(mocks.request).not.toHaveBeenCalled()
		})
	})

	describe('Pick a repository', () => {
		it('should put in the store the repository picked', async () => {
			const first = { name: 'first repository' }
			const second = { name: 'second repository' }
			repositoryPicker.setData({ repositories: [first, second] })

			await repositoryPicker
				.findComponent('[data-test=repository-input]')
				.vm.$emit('selected', 'second repository')

			expect(useRepositoryStore().addRepository).toHaveBeenCalledWith(second)
		})
	})
})
