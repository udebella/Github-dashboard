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

		it(`should a remove icon`, () => {
			expect(repositoryRemover.find(`[data-test=icon]`).exists()).to.be.true
			expect(repositoryRemover.find(`[data-test=icon]`).attributes().icon).to.equals(`trash`)
		})
	})
})
