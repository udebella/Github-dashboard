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

		it(`should display the component`, () => {
			expect(repositoryPicker.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
