import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryList from './repository-list.vue'

describe(`RepositoryList component`, () => {
	let repositoryList

	beforeEach(() => {
		const store = {
			state: {watchedRepositories: [{name: `repository`, owner: `user`}]},
		}

		repositoryList = shallowMount(RepositoryList, {store})
	})

	describe(`Initialisation`, () => {
		it(`should have repository-list name`, () => {
			expect(repositoryList.name()).to.equals(`repository-list`)
		})

		it(`should display a list of repositories`, () => {
			// Given
			const store = {
				state: {watchedRepositories: [{name: `repository`, owner: `user`}]},
			}

			// When
			const repositoryList = shallowMount(RepositoryList, {store})

			// Then
			expect(repositoryList.contains({name: `repository-line`})).to.be.true
		})

		it(`should not display anything if the list is empty`, () => {
			// Given
			const store = {
				state: {watchedRepositories: []},
			}

			// When
			const repositoryList = shallowMount(RepositoryList, {store})

			// Then
			expect(repositoryList.contains({name: `repository-line`})).to.be.false
		})

		it(`should display a repository adder component`, () => {
			expect(repositoryList.find({name: `repository-adder`}).exists()).to.be.true
		})
	})
})
