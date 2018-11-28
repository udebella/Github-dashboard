import {expect} from 'chai'
import {mutations, store} from './store'

describe('Store', () => {
	describe('Initial state', () => {
		it('should have an empty watched repository list by default', () => {
			expect(store.state.watchedRepositories).to.deep.equals([])
		})

		it('should use the public github api by default', () => {
			expect(store.state.githubApi).to.equals('https://api.github.com/graphql')
		})

		it('should have configuration mode enabled by default', () => {
			expect(store.state.configurationEnabled).to.be.true
		})
	})

	describe('addRepository', () => {
		const {addRepository} = mutations
		it('should add a repository to watch for the username', () => {
			const store = {watchedRepositories: []}

			const repository = {owner: 'username', name: 'repository'}
			addRepository(store, repository)

			expect(store.watchedRepositories).to.deep.equal([repository])
		})

		it('should allow to add multiple repositories for an user ordered by name', () => {
			const firstRepository = {owner: 'user', name: 'repository'}
			const store = {watchedRepositories: [firstRepository]}

			const repository = {owner: 'username', name: 'another repository'}
			addRepository(store, repository)

			expect(store.watchedRepositories).to.deep.equal([repository, firstRepository])
		})

		it('should not mutate the store', () => {
			// Given
			const watchedRepositories = [{owner: 'user', name: 'repository'}]
			const store = {watchedRepositories}

			// When
			addRepository(store, {owner: 'username', name: 'another repository'})

			// Then
			expect(store.watchedRepositories).not.to.equal(watchedRepositories)
		})

		it('should keep previous watched repositories in the store', () => {
			const firstRepository = {owner: 'user', name: 'repository'}
			const store = {watchedRepositories: [firstRepository]}

			addRepository(store, {owner: 'user', name: 'another repository'})

			expect(store.watchedRepositories).to.contains(firstRepository)
		})
	})

	describe('removeRepository', () => {
		const {removeRepository} = mutations

		it('should remove watched repository for the username', () => {
			const firstRepository = {owner: 'user', name: 'repository'}
			const store = {watchedRepositories: [firstRepository]}

			removeRepository(store, {owner: 'user', name: 'repository'})

			expect(store.watchedRepositories).to.deep.equal([])
		})

		it('should only remove the specified repository and keep the others', () => {
			const firstRepository = {owner: 'user', name: 'repository'}
			const secondRepository = {owner: 'user', name: 'secondRepository'}
			const store = {watchedRepositories: [firstRepository, secondRepository]}

			removeRepository(store, {owner: 'user', name: 'repository'})

			expect(store.watchedRepositories).to.deep.equal([secondRepository])
		})

		it('should match repositories by owner and name', () => {
			const firstRepository = {owner: 'user', name: 'repository'}
			const secondRepository = {owner: 'otherUser', name: 'repository'}
			const store = {watchedRepositories: [firstRepository, secondRepository]}

			removeRepository(store, {owner: 'user', name: 'repository'})

			expect(store.watchedRepositories).to.deep.equal([secondRepository])
		})
	})

	describe('updateGithubApi', () => {
		const {updateGithubApi} = mutations

		it('should update the github api in the store', () => {
			const store = {}

			updateGithubApi(store, 'http://new-api')

			expect(store.githubApi).to.equals('http://new-api')
		})
	})

	describe('toggleConfiguration', () => {
		const {toggleConfiguration} = mutations

		it('should enable configuration mode when configuration is disabled', () => {
			const store = {}

			toggleConfiguration(store)

			expect(store.configurationEnabled).to.be.true
		})

		it('should disable configuration mode when configuration is enabled', () => {
			const store = { configurationEnabled: true }

			toggleConfiguration(store)

			expect(store.configurationEnabled).to.be.false
		})
	})
})
