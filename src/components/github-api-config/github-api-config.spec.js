import {expect} from 'chai'
import {stub} from "sinon"
import {shallowMount} from '@vue/test-utils'
import GithubApiConfig from './github-api-config.vue'

describe(`GithubApiConfig component`, () => {
	let githubApiConfig, store

	beforeEach(() => {
		store = {
			commit: stub(),
			state: {
				githubApi: `http://github-api`,
			},
		}

		githubApiConfig = shallowMount(GithubApiConfig, {store})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(githubApiConfig.name()).to.equal(`github-api-config`)
		})

		it(`should display an input`, () => {
			expect(githubApiConfig.find(`input`).exists()).to.be.true
		})

		it(`should display as default value the one from the store`, () => {
			expect(githubApiConfig.find(`[data-test=input]`).element.value).to.equals(`http://github-api`)
		})
	})

	describe(`Update github api`, () => {
		it(`should save the new api in the store when changed`, () => {
			githubApiConfig.find(`[data-test=input]`).setValue(`https://new-api`)

			expect(store.commit).to.have.been.calledWith(`updateGithubApi`, `https://new-api`)
		})
	})
})
