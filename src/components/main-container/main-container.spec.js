import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import MainContainer from './main-container.vue'

describe(`MainContainer component`, () => {
	let mainContainer

	beforeEach(() => {
		mainContainer = shallowMount(MainContainer)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(mainContainer.name()).to.equal(`main-container`)
		})

		it(`should display the component`, () => {
			expect(mainContainer.find({name: 'github-api-config'}).exists()).to.be.true
		})
	})
})
