import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import RepositoryPicker from './repository-picker.vue'
import {query} from "./repository-picker.query"
import flushPromises from 'flush-promises'

const fakeResponse = {
	search: {
		nodes: [
			{
				nameWithOwner: `facebook/react`,
				name: `react`,
				owner: {
					login: `facebook`,
				},
				url: `https://github.com/facebook/react`,
				defaultBranchRef: {
					name: `master`,
				},
			},
		],
	},
}

describe(`RepositoryPicker component`, () => {
	let repositoryPicker, mocks, store

	beforeEach(() => {
		store = {
			commit: stub(),
		},
		mocks = {
			request: stub(),
		}
		repositoryPicker = shallowMount(RepositoryPicker, {propsData: mocks, store})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(repositoryPicker.name()).to.equal(`repository-picker`)
		})

		it(`should display a input to enter repository owner`, () => {
			expect(repositoryPicker.find(`[data-test=search-input]`).exists()).to.be.true
		})
	})

	describe(`Enter repository owner`, () => {
		it(`should make a request to retrieve repositories of the owner`, () => {
			expect(mocks.request).not.to.have.been.called
			repositoryPicker.find(`[data-test=search-input]`).vm.$emit(`input`, `test`)

			expect(mocks.request).to.have.been.calledWith(query(`test`))
		})

		it(`should display a select to allow user to pick a repository`, async () => {
			mocks.request.returns(fakeResponse)
			repositoryPicker = shallowMount(RepositoryPicker, {
				propsData: mocks,
			})

			repositoryPicker.find(`[data-test=search-input]`).vm.$emit(`input`, `test`)

			await flushPromises()
			expect(repositoryPicker.find(`[data-test=repository-input]`).attributes().items).to.deep.equals(`react`)
		})

		it(`should not make queries when update value is empty`, () => {
			repositoryPicker.find(`[data-test=search-input]`).vm.$emit(`input`, ``)

			expect(mocks.request).not.to.have.been.called
		})
	})

	describe(`Pick a repository`, () => {
		it(`should put in the store the repository picked`, () => {
			const first = {name: `first repository`}
			const second = {name: `second repository`}
			repositoryPicker.setData({repositories: [first, second]})

			repositoryPicker.find(`[data-test=repository-input]`).vm.$emit(`selected`, `second repository`)

			expect(store.commit).to.have.been.calledWith(`addRepository`, second)
		})
	})
})
