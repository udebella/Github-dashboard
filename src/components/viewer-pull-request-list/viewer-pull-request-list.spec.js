import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ViewerPullRequestList from './viewer-pull-request-list.vue'

describe(`ViewerPullRequestList component`, () => {
	let viewerPullRequestList

	beforeEach(() => {
		viewerPullRequestList = shallowMount(ViewerPullRequestList)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(viewerPullRequestList.name()).to.equal(`viewer-pull-request-list`)
		})

		it(`should display the component`, () => {
			expect(viewerPullRequestList.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
