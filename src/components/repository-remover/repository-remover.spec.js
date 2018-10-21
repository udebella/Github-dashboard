import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RepositoryRemover from './repository-remover.vue'
import {stub} from "sinon"

describe(`RepositoryRemover component`, () => {
	let repositoryRemover, store

	beforeEach(() => {
		store = {
			state: {configurationEnabled: true},
			commit: stub(),
		},
		repositoryRemover = shallowMount(RepositoryRemover, {propsData: {name: `example`, owner: `user`}, store})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(repositoryRemover.name()).to.equal(`repository-remover`)
		})

		it(`should display a remove icon`, () => {
			expect(repositoryRemover.find(`[data-test=icon]`).exists()).to.be.true
			expect(repositoryRemover.find(`[data-test=icon]`).attributes().icon).to.equals(`trash`)
		})

		it(`should hide the remove icon when configuration mode is disabled`, () => {
			store.state.configurationEnabled = false
			repositoryRemover = shallowMount(RepositoryRemover, {propsData: {name: `example`, owner: `user`}, store})

			expect(repositoryRemover.find(`[data-test=icon]`).exists()).to.be.false
		})
	})

	describe(`Removing a repository`, () => {
		it(`should remove the repository from watched repository when clicked`, () => {
			repositoryRemover.find({name: `custom-button`}).vm.$emit(`click`)

			expect(store.commit).to.have.been.calledWith(`removeRepository`, {name: `example`, owner: `user`})
		})
	})
})
