import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import PullRequestLine from './pull-request-line.vue'

describe(`PullRequestLine component`, () => {
	let pullRequestLine

	beforeEach(() => {
		pullRequestLine = shallowMount(PullRequestLine)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(pullRequestLine.name()).to.equal(`pull-request-line`)
		})

		it(`should display the component`, () => {
			expect(pullRequestLine.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
