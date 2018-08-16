import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RepositoryAdder from './repository-adder.vue'

describe(`RepositoryAdder component`, () => {
	let repositoryAdder

	beforeEach(() => {
		repositoryAdder = shallowMount(RepositoryAdder)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(repositoryAdder.name()).to.equal(`repository-adder`)
		})

		it(`should display the component`, () => {
			expect(repositoryAdder.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
