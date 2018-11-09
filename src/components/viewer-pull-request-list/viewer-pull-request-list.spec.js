import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ViewerPullRequestList from './viewer-pull-request-list.vue'
import flushPromises from 'flush-promises'
import {stub} from 'sinon'
import {viewerFragment} from './viewer-pull-request-list'

describe(`ViewerPullRequestList component`, () => {
	let stubs

	beforeEach(() => {
		const store = {
			state: {watchedRepositories: [{name: `repository`, owner: `user`}]},
		}
		stubs = {
			store,
			queryBuilder: stub(),
			request: stub(),
		}
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {store: stubs.store, propsData: stubs})

			expect(viewerPullRequestList.name()).to.equal(`viewer-pull-request-list`)
		})

		it(`should call graphql api to retrieve data over the list of repositories`, async () => {
			// Given
			stubs.queryBuilder.returns(`queryBuilt`)

			// When
			shallowMount(ViewerPullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.request).to.have.been.calledWith(`queryBuilt`)
			expect(stubs.queryBuilder).to.have.been.calledWith(viewerFragment)
		})
	})
})
