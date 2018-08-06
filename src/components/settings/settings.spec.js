import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import Settings from './settings.vue'
import {stub, useFakeTimers} from "sinon"

describe(`Settings component`, () => {
	let settings, stubRequest, clock, store

	beforeEach(() => {
		store = {
			state: {watchedRepositories: {}},
			commit: stub(),
		}
		clock = useFakeTimers()

		settings = shallowMount(Settings, {store})
	})

	afterEach(() => {
		clock.restore()
	})

	describe(`Initialisation`, () => {
		it(`should have default values`, () => {
			expect(settings.vm.$data).to.deep.include({
				username: ``,
				userRepositories: [],
				userStarredRepositories: [],
			})
		})
	})

	describe(`Template`, () => {
		describe(`user repositories`, () => {
			it(`should not display a list picker for user repositories while there is no repositories to display`, () => {
				settings.setData({userRepositories: []})
				const userRepositoriesPicker = settings.find(`[data-test=repositories]`)

				expect(userRepositoriesPicker.exists()).to.be.false
			})

			it(`should display a list picker for user repositories`, () => {
				settings.setData({userRepositories: [`user repository`]})
				const userRepositoriesPicker = settings.find(`[data-test=repositories]`)

				expect(userRepositoriesPicker.exists()).to.be.true
			})
		})

		describe(`user starred repositories`, () => {
			it(`should not display a list picker for user repositories while there is no repositories to display`, () => {
				settings.setData({userStarredRepositories: []})
				const userStarredRepositoriesPicker = settings.find(`[data-test=starredRepositories]`)

				expect(userStarredRepositoriesPicker.exists()).to.be.false
			})

			it(`should display a list picker for user starred repositories`, () => {
				settings.setData({userStarredRepositories: [`user starred repository`]})
				const userStarredRepositoriesPicker = settings.find(`[data-test=starredRepositories]`)

				expect(userStarredRepositoriesPicker.exists()).to.be.true
			})
		})
	})

	describe(`on edit username`, () => {
		it(`should update user starred repositories`, (done) => {
			stubRequest = stub().returns({
				user: {
					starredRepositories: {
						nodes: [{
							name: `repository`,
							owner: {login: `other_user`},
						}],
					},
				},
			})

			settings.setData({username: `username`, request: stubRequest})
			clock.tick(1000)

			settings.vm.$nextTick(() => {
				expect(settings.vm.$data.userStarredRepositories).to.deep.equals([{
					name: `repository`,
					owner: `other_user`,
				}])
				done()
			})
		})

		it(`should update user repositories`, (done) => {
			stubRequest = stub().returns({
				user: {
					repositories: {
						nodes: [{name: `repository`, owner: {login: `user`}}],
					},
				},
			})

			settings.setData({username: `user`, request: stubRequest})
			clock.tick(1000)

			settings.vm.$nextTick(() => {
				expect(settings.vm.$data.userRepositories).to.deep.equals([{
					name: `repository`, owner: `user`,
				}])
				done()
			})
		})

		it(`should handle empty responses from github`, (done) => {
			stubRequest = stub()

			settings.setData({username: `user`, request: stubRequest})
			clock.tick(1000)

			settings.vm.$nextTick(() => {
				expect(settings.vm.$data.userRepositories).to.deep.equals([])
				expect(settings.vm.$data.userStarredRepositories).to.deep.equals([])
				done()
			})
		})
	})

	describe(`method selectRepository`, () => {
		it(`should add the repository to the store`, () => {
			// Given
			settings.setData({userRepositories: [{owner: `user`, name: `repository`}]})

			// When
			settings.vm.selectRepository(`repository`)

			// Then
			expect(store.commit).to.have.been
				.calledWith(`addRepository`, {owner: `user`, name: `repository`})
		})

		it(`should allow to add repositories from starred repositories too`, () => {
			// Given
			settings.setData({userStarredRepositories: [{owner: `other_user`, name: `repository`}]})

			// When
			settings.vm.selectRepository(`repository`)

			// Then
			expect(store.commit).to.have.been
				.calledWith(`addRepository`, {owner: `other_user`, name: `repository`})
		})
	})

	describe(`method unselectRepository`, () => {
		it(`should remove the repository from the store`, () => {
			// Given
			settings.setData({userRepositories: [{owner: `user`, name: `repository`}]})

			// When
			settings.vm.unselectRepository(`repository`)

			// Then
			expect(store.commit).to.have.been
				.calledWith(`removeRepository`, {owner: `user`, name: `repository`})
		})
	})

	describe(`method formatForListPicker`, () => {
		it(`should format the repository array for list picker as a list of string`, () => {
			const formatted = settings.vm.formatForListPicker([{owner: `other_user`, name: `repository`}])

			expect(formatted).to.deep.equal([`repository`])
		})
	})
})
