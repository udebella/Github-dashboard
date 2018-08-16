import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RepositoryPicker from './repository-picker.vue'

describe(`RepositoryPicker component`, () => {
	let repositoryPicker

	beforeEach(() => {
		repositoryPicker = shallowMount(RepositoryPicker)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(repositoryPicker.name()).to.equal(`repository-picker`)
		})

		it(`should display a input to enter repository owner`, () => {
			expect(repositoryPicker.find(`[data-test=repository-owner]`).exists()).to.be.true
		})
	})
})
