import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import PullRequestLine from './pull-request-line.vue'

describe(`PullRequestLine component`, () => {
	let pullRequestLine

	beforeEach(() => {
		pullRequestLine = shallowMount(PullRequestLine, {
			propsData: {
				title: `Pull request name`,
				url: `http://pull-request-url`,
			},
		})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(pullRequestLine.name()).to.equal(`pull-request-line`)
		})

		it(`should display the pull request name`, () => {
			expect(pullRequestLine.find(`[data-test=name]`).text()).to.equal(`Pull request name`)
		})

		it(`should display a link to the pull request`, () => {
			expect(pullRequestLine.find(`[data-test=link]`).attributes().href).to.equal(`http://pull-request-url`)
		})
	})
})
