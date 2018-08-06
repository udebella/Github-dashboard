import {expect} from 'chai'
import {mutations} from './store'

describe(`Store`, () => {
	describe(`addRepository`, () => {
		const {addRepository} = mutations
		it(`should add a repository to watch for the username`, () => {
			const store = {watchedRepositories: {}}

			addRepository(store, {owner: `username`, name: `repository`})

			expect(store.watchedRepositories.username).to.deep.equal([`repository`])
		})

		it(`should allow to add multiple repositories for an user`, () => {
			const store = {watchedRepositories: { username: [`repository`] }}

			addRepository(store, {owner: `username`, name: `another repository`})

			expect(store.watchedRepositories.username).to.deep.equal([`repository`, `another repository`])
		})

		it(`should not mutate the store`, () => {
			// Given
			const watchedRepositories = { username: [`repository`] }
			const store = {watchedRepositories}

			// When
			addRepository(store, {owner: `username`, name: `another repository`})

			// Then
			expect(store.watchedRepositories).not.to.equal(watchedRepositories)
		})

		it(`should keep previous watched repositories in the store`, () => {
			const store = {watchedRepositories: { username: [`repository`] }}

			addRepository(store, {owner: `user`, name: `another repository`})

			expect(store.watchedRepositories.username).to.deep.equal([`repository`])
		})
	})

	describe(`removeRepository`, () => {
		const {removeRepository} = mutations

		it(`should remove watched repository for the username`, () => {
			const store = {watchedRepositories: {username: [`repository`] }}

			removeRepository(store, {owner: `username`, name: `repository`})

			expect(store.watchedRepositories.username).to.deep.equal([])
		})

		it(`should only remove the specified repository and keep the others`, () => {
			const store = {watchedRepositories: {username: [`repository`, `another repository`] }}

			removeRepository(store, {owner: `username`, name: `repository`})

			expect(store.watchedRepositories.username).to.deep.equal([`another repository`])
		})
	})
})
