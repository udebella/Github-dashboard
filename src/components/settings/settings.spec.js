import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import Settings from './settings.vue'
import {stub, useFakeTimers} from "sinon"

describe(`Settings component`, () => {
	let settings, stubRequest, clock

	beforeEach(() => {
		clock = useFakeTimers()

		settings = shallowMount(Settings)
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
				watchedRepositories: {},
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
						nodes: [{name: `user starred repository`}],
					},
				},
			})

			settings.setData({username: `username`, request: stubRequest})
			clock.tick(1000)

			settings.vm.$nextTick(() => {
				expect(settings.vm.$data.userStarredRepositories).to.deep.equals([`user starred repository`])
				done()
			})
		})

		it(`should update user repositories`, (done) => {
			stubRequest = stub().returns({
				user: {
					repositories: {
						nodes: [{name: `user repository`}],
					},
				},
			})

			settings.setData({username: `username`, request: stubRequest})
			clock.tick(1000)

			settings.vm.$nextTick(() => {
				expect(settings.vm.$data.userRepositories).to.deep.equals([`user repository`])
				done()
			})
		})

		it(`should handle empty responses from github`, (done) => {
			stubRequest = stub()

			settings.setData({username: `username`, request: stubRequest})
			clock.tick(1000)

			settings.vm.$nextTick(() => {
				expect(settings.vm.$data.userRepositories).to.deep.equals([])
				expect(settings.vm.$data.userStarredRepositories).to.deep.equals([])
				done()
			})
		})
	})

	describe(`method updateRepositories`, () => {
		it(`should update watched repositories`, () => {
			settings.setData({username: `username`})

			settings.vm.updateRepositories([`addedRepository`])

			expect(settings.vm.$data.watchedRepositories).to.deep.equals({
				username: {
					repositories: [`addedRepository`],
				},
			})
		})
	})

	describe(`method updateStarredRepositories`, () => {
		it(`should update watched repositories`, () => {
			settings.setData({username: `username`})

			settings.vm.updateStarredRepositories([`addedRepository`])

			expect(settings.vm.$data.watchedRepositories).to.deep.equals({
				username: {
					starredRepositories: [`addedRepository`],
				},
			})
		})
	})
})
