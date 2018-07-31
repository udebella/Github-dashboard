import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import Settings from './settings.vue'

describe(`Settings component`, () => {
	let settings

	beforeEach(() => {
		settings = shallowMount(Settings)
	})

	describe(`Initialisation`, () => {
		it(`should have default values`, () => {
			expect(settings.vm.$data).to.deep.equals({
				username: ``,
				userRepositories: [],
				userStarredRepositories: [],
				watchedRepositories: {},
			})
		})
	})
})
