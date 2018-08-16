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

		it(`should not display owner input by default`, () => {
			expect(repositoryAdder.find(`[data-test=owner-input]`).exists()).to.be.false
		})
	})

	describe(`Adding a repository`, () => {
		it(`should display a debounced input when clicked`, () => {
			const icon = repositoryAdder.find(`[data-test=icon]`)

			icon.vm.$emit(`click`)

			expect(repositoryAdder.find(`[data-test=owner-input]`).exists()).to.be.true
		})

		it(`should hide the icon when clicked`, () => {
			const icon = repositoryAdder.find(`[data-test=icon]`)

			icon.vm.$emit(`click`)

			expect(icon.exists()).to.be.false
		})
	})
})
