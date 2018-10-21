import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import PullRequestList from './pull-request-list.vue'

describe(`PullRequestList component`, () => {
	let pullRequestList

	beforeEach(() => {
		pullRequestList = shallowMount(PullRequestList)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(pullRequestList.name()).to.equal(`pull-request-list`)
		})

		it(`should display the component`, () => {
			expect(pullRequestList.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
