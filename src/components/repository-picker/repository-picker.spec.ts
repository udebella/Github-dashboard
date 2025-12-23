import { flushPromises, shallowMount } from '@vue/test-utils'
import RepositoryPicker from './repository-picker.vue'
import { query } from './repository-picker.query.ts'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useRepositoryStore } from '../../stores/repositories/repositories'
import type { Mocks, Wrapper } from '../../test-utils.ts'
import DebouncedInput from '../ui/debounced-input/debounced-input.vue'
import CustomSelect from '../ui/custom-select/custom-select.vue'
import { buildRequest } from '../../services/graphql/graphql-client.ts'

const fakeResponse = {
	search: {
		nodes: [
			{
				nameWithOwner: 'facebook/react',
				name: 'react',
				owner: { login: 'facebook' },
				url: 'https://github.com/facebook/react',
				defaultBranchRef: { name: 'master' }
			}
		]
	}
}

type Dependencies = {
	request: ReturnType<typeof buildRequest>
}

describe('RepositoryPicker component', () => {
	let repositoryPicker: Wrapper<typeof RepositoryPicker>
	let mocks: Mocks<Dependencies>

	beforeEach(() => {
		setActivePinia(
			createTestingPinia({
				createSpy: vitest.fn
			})
		)
		mocks = {
			request: vitest.fn().mockReturnValue(fakeResponse)
		}
		repositoryPicker = shallowMount(RepositoryPicker, { global: { provide: mocks } })
	})

	it('should display a input to enter repository owner', () => {
		expect(repositoryPicker.findComponent(DebouncedInput).exists()).toBe(true)
	})

	describe('Enter repository owner', () => {
		it('should make a request to retrieve repositories of the owner', async () => {
			expect(mocks.request).not.toHaveBeenCalled()
			await repositoryPicker.findComponent(DebouncedInput).vm.$emit('input', 'test')

			expect(mocks.request).toHaveBeenCalledWith(query('test'))
		})

		it('should display a select to allow user to pick a repository', async () => {
			await repositoryPicker.findComponent(DebouncedInput).vm.$emit('input', 'test')

			await flushPromises()
			expect(repositoryPicker.findComponent(CustomSelect).attributes().items).toEqual('react')
		})

		it('should not make queries when update value is empty', async () => {
			await repositoryPicker.findComponent(DebouncedInput).vm.$emit('input', '')

			expect(mocks.request).not.toHaveBeenCalled()
		})
	})

	describe('Pick a repository', () => {
		it('should put in the store the repository picked', async () => {
			mocks.request.mockResolvedValue({
				search: {
					nodes: [
						{
							name: 'first repository',
							owner: {
								login: 'mary'
							},
							url: 'https://first',
							defaultBranchRef: {
								name: 'main'
							}
						},
						{
							name: 'second repository',
							owner: {
								login: 'john'
							},
							url: 'https://second',
							defaultBranchRef: {
								name: 'main'
							}
						}
					]
				}
			})
			repositoryPicker = shallowMount(RepositoryPicker, { global: { provide: mocks } })

			await repositoryPicker.findComponent(DebouncedInput).vm.$emit('input', 'test')

			await repositoryPicker.findComponent(CustomSelect).vm.$emit('selected', 'second repository')

			expect(useRepositoryStore().addRepository).toHaveBeenCalledWith({
				defaultBranch: 'main',
				name: 'second repository',
				owner: 'john',
				url: 'https://second'
			})
		})
	})
})
