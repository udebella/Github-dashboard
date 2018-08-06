import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryList from './repository-list.vue'

describe(`RepositoryList component`, () => {
	describe(`Initialisation`, () => {
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
			expect(repositoryList.contains(`ul`)).to.be.false
		})
	})
})
