import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import MainContainer from './main-container.vue'
import {describe, beforeEach, it} from "vitest";

describe('MainContainer component', () => {
	let mainContainer

	beforeEach(() => {
		mainContainer = shallowMount(MainContainer)
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(mainContainer.exists()).to.be.true
		})

		it('should display configuration component', () => {
			expect(mainContainer.findComponent({name: 'github-api-config'}).exists()).to.be.true
		})

		it('should display repository list component', () => {
			expect(mainContainer.findComponent({name: 'repository-list'}).exists()).to.be.true
		})

		it('should display pull request list component', () => {
			expect(mainContainer.findComponent({name: 'pull-request-list'}).exists()).to.be.true
		})

		it('should display recently closed pull requests', () => {
			expect(mainContainer.findComponent({name: 'recently-closed-pull-requests'}).exists()).to.be.true
		})
	})
})
