import {expect} from "vitest";
import { describe, it, beforeEach } from "vitest";
import {useRepositoryStore} from "@/stores/repositories";
import {createPinia, setActivePinia} from "pinia";

describe('Repositories store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	});

	it('should not watch any repository by default', () => {
		const store = useRepositoryStore()

		expect(store.watched).toEqual([])
	});

	describe('addRepository', () => {
		it('should add a repository to watch for the username', () => {
			const store = useRepositoryStore();
			const repository = {owner: 'username', name: 'repository'}

			store.addRepository(repository)

			expect(store.watched).toEqual([repository])
		})

		// it('should allow to add multiple repositories for an user ordered by name', () => {
		// 	const firstRepository = {owner: 'user', name: 'repository'}
		// 	const store = {watchedRepositories: [firstRepository]}
		//
		// 	const repository = {owner: 'username', name: 'another repository'}
		// 	addRepository(store, repository)
		//
		// 	expect(store.watchedRepositories).to.deep.equal([repository, firstRepository])
		// })
		//
		// it('should not mutate the store', () => {
		// 	// Given
		// 	const watchedRepositories = [{owner: 'user', name: 'repository'}]
		// 	const store = {watchedRepositories}
		//
		// 	// When
		// 	addRepository(store, {owner: 'username', name: 'another repository'})
		//
		// 	// Then
		// 	expect(store.watchedRepositories).not.to.equal(watchedRepositories)
		// })
		//
		// it('should keep previous watched repositories in the store', () => {
		// 	const firstRepository = {owner: 'user', name: 'repository'}
		// 	const store = {watchedRepositories: [firstRepository]}
		//
		// 	addRepository(store, {owner: 'user', name: 'another repository'})
		//
		// 	expect(store.watchedRepositories).to.contains(firstRepository)
		// })
	})
});
