import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RepositoryRemover from './repository-remover.vue'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {stub} from 'sinon'

describe('RepositoryRemover component', () => {
	let repositoryRemover, store

	beforeEach(() => {
		store = {
			state: {configurationEnabled: true},
			commit: stub(),
		}
		repositoryRemover = shallowMount(RepositoryRemover, {propsData: {name: 'example', owner: 'user'}, store})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(repositoryRemover.exists()).to.be.true
		})

		it('should display a remove icon', () => {
			let icon = repositoryRemover.find('[data-test=icon]')
			expect(icon.exists()).to.be.true
			expect(icon.vm.$attrs.icon).to.deep.equals(faTrash)
		})

		it('should hide the remove icon when configuration mode is disabled', () => {
			store.state.configurationEnabled = false
			repositoryRemover = shallowMount(RepositoryRemover, {propsData: {name: 'example', owner: 'user'}, store})

			expect(repositoryRemover.find('[data-test=icon]').exists()).to.be.false
		})
	})

	describe('Removing a repository', () => {
		it('should remove the repository from watched repository when clicked', () => {
			repositoryRemover.findComponent({name: 'custom-button'}).vm.$emit('click')

			expect(store.commit).to.have.been.calledWith('removeRepository', {name: 'example', owner: 'user'})
		})
	})
})
