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

		it(`should display an add icon`, () => {
			const icon = repositoryAdder.find(`[data-test=icon]`)

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equals(`plus-circle`)
		})
	})
})
