import {expect} from 'chai'
import {storeInit} from './store-init-plugin'
import {stub} from 'sinon'

describe('Init store', () => {
	let fakeStore

	beforeEach(() => {
		fakeStore = {
			state: {},
			replaceState: stub(),
		}
	})

	describe('Initialization', () => {
		it('should be a function to give to vuex', () => {
			expect(storeInit).to.be.a('function')
		})
	})

	describe('Initialize the store', () => {
		it('should initialize the store with default values when nothing is provided', () => {
			storeInit(fakeStore)

			expect(fakeStore.replaceState).to.have.been.calledWith({
				githubApi: 'https://api.github.com/graphql',
				watchedRepositories: [],
				configurationEnabled: true,
				timeBetweenRefresh: 30,
			})
		})

		it('should not erase already defined properties', () => {
			fakeStore.state = {githubApi: 'https://another.github.api'}
			storeInit(fakeStore)

			expect(fakeStore.replaceState).to.have.been.calledWith({
				githubApi: 'https://another.github.api',
				watchedRepositories: [],
				configurationEnabled: true,
				timeBetweenRefresh: 30,
			})
		})
	})
})
