import {expect} from 'chai'
import {mutations} from './store'

describe(`Store`, () => {
	describe(`addRepository`, () => {
		const {addRepository} = mutations
		it(`should add a repository to watch for the username`, () => {
			const store = {watchedRepositories: []}

			const repository = {owner: `username`, name: `repository`}
			addRepository(store, repository)

			expect(store.watchedRepositories).to.deep.equal([repository])
		})

		it(`should allow to add multiple repositories for an user`, () => {
			const firstRepository = {owner: `user`, name: `repository`}
			const store = {watchedRepositories: [firstRepository]}

			const repository = {owner: `username`, name: `another repository`}
			addRepository(store, repository)

			expect(store.watchedRepositories).to.deep.equal([firstRepository, repository])
		})

		it(`should not mutate the store`, () => {
			// Given
			const watchedRepositories = [{owner: `user`, name: `repository`}]
			const store = {watchedRepositories}

			// When
			addRepository(store, {owner: `username`, name: `another repository`})

			// Then
			expect(store.watchedRepositories).not.to.equal(watchedRepositories)
		})

		it(`should keep previous watched repositories in the store`, () => {
			const firstRepository = {owner: `user`, name: `repository`}
			const store = {watchedRepositories: [firstRepository]}

			addRepository(store, {owner: `user`, name: `another repository`})

			expect(store.watchedRepositories).to.contains(firstRepository)
		})
	})

	describe(`removeRepository`, () => {
		const {removeRepository} = mutations

		it(`should remove watched repository for the username`, () => {
			const firstRepository = {owner: `user`, name: `repository`}
			const store = {watchedRepositories: [firstRepository]}

			removeRepository(store, {owner: `user`, name: `repository`})

			expect(store.watchedRepositories).to.deep.equal([])
		})

		it(`should only remove the specified repository and keep the others`, () => {
			const firstRepository = {owner: `user`, name: `repository`}
			const secondRepository = {owner: `user`, name: `secondRepository`}
			const store = {watchedRepositories: [firstRepository, secondRepository]}

			removeRepository(store, {owner: `user`, name: `repository`})

			expect(store.watchedRepositories).to.deep.equal([secondRepository])
		})

		it(`should match repositories by owner and name`, () => {
			const firstRepository = {owner: `user`, name: `repository`}
			const secondRepository = {owner: `otherUser`, name: `repository`}
			const store = {watchedRepositories: [firstRepository, secondRepository]}

			removeRepository(store, {owner: `user`, name: `repository`})

			expect(store.watchedRepositories).to.deep.equal([secondRepository])
		})
	})
})
