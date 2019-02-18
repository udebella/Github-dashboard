import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import MainContainer from './main-container.vue'

describe('MainContainer component', () => {
	let mainContainer

	beforeEach(() => {
		mainContainer = shallowMount(MainContainer)
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(mainContainer.name()).to.equal('main-container')
		})

		it('should display configuration component', () => {
			expect(mainContainer.find({name: 'github-api-config'}).exists()).to.be.true
		})

		it('should display repository list component', () => {
			expect(mainContainer.find({name: 'repository-list'}).exists()).to.be.true
		})

		it('should display pull request list component', () => {
			expect(mainContainer.find({name: 'pull-request-list'}).exists()).to.be.true
		})

		it('should display recently closed pull requests', () => {
			expect(mainContainer.find({name: 'recently-closed-pull-requests'}).exists()).to.be.true
		})
	})
})
