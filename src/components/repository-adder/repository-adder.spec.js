import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RepositoryAdder from './repository-adder.vue'

describe('RepositoryAdder component', () => {
	let repositoryAdder, store

	beforeEach(() => {
		store = {
			state: {configurationEnabled: true},
		}
		repositoryAdder = shallowMount(RepositoryAdder, {store})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(repositoryAdder.exists()).to.be.true
		})

		it('should hide the component when configuration mode is disabled', () => {
			store.state.configurationEnabled = false
			repositoryAdder = shallowMount(RepositoryAdder, {store})

			expect(repositoryAdder.find('[data-test=button]').exists()).to.be.false
		})
	})

	describe('Adding a repository', () => {
		it('should display a debounced input', () => {
			expect(repositoryAdder.find('[data-test=owner-input]').exists()).to.be.true
		})

		it('should hide the icon when clicked', () => {
			const icon = repositoryAdder.find('[data-test=icon]')

			repositoryAdder.findComponent({name: 'badge'}).vm.$emit('click')

			expect(icon.exists()).to.be.false
		})
	})
})
