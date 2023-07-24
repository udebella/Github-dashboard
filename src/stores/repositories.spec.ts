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

		it('should allow to add multiple repositories for an user ordered by name', () => {
			const store = useRepositoryStore()

			const firstRepository = {owner: 'user', name: 'repository'}
			store.addRepository(firstRepository)
			const repository = {owner: 'username', name: 'another repository'}
			store.addRepository(repository)

			expect(store.watched).toEqual([firstRepository, repository])
		})
	})
});
