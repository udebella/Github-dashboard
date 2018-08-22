import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RepositoryRemover from './repository-remover.vue'

describe(`RepositoryRemover component`, () => {
	let repositoryRemover

	beforeEach(() => {
		repositoryRemover = shallowMount(RepositoryRemover)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(repositoryRemover.name()).to.equal(`repository-remover`)
		})

		it(`should display the component`, () => {
			expect(repositoryRemover.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
