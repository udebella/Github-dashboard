import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { type Repository, useRepositoryStore } from './repositories'

describe('Repositories store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should not watch any repository by default', () => {
		const store = useRepositoryStore()

		expect(store.watched).toEqual([])
	})

	describe('addRepository', () => {
		it('adds a repository to watch for the username', () => {
			const store = useRepositoryStore()

			store.addRepository(createRepository())

			expect(store.watched).toEqual([createRepository()])
		})

		it('allows to add multiple repositories for an user ordered by name', () => {
			const store = useRepositoryStore()

			store.addRepository(createRepository({ name: 'repository' }))
			store.addRepository(createRepository({ name: 'another repository' }))

			expect(store.watched).toEqual([
				createRepository({ name: 'another repository' }),
				createRepository({ name: 'repository' })
			])
		})

		it('does not allow to add twice the same repository', () => {
			const store = useRepositoryStore()

			store.addRepository(createRepository())
			store.addRepository(createRepository())

			expect(store.watched).toEqual([createRepository()])
		})
	})

	describe('removeRepository', () => {
		it('removes watched repository for the username', () => {
			const store = useRepositoryStore()
			store.addRepository(createRepository())

			store.removeRepository(createRepository())

			expect(store.watched).toEqual([])
		})

		it('only removes the specified repository and keep the others', () => {
			const store = useRepositoryStore()
			store.addRepository(createRepository({ name: 'first' }))
			store.addRepository(createRepository({ name: 'second' }))

			store.removeRepository(createRepository({ name: 'first' }))

			expect(store.watched).toEqual([createRepository({ name: 'second' })])
		})
	})

	describe('shareConfiguration', () => {
		it('exposes a string in base64 to share configuration', () => {
			const store = useRepositoryStore()
			store.addRepository(createRepository())

			expect(store.shareString).toBe(
				'W3sib3duZXIiOiJ1c2VybmFtZSIsIm5hbWUiOiJyZXBvc2l0b3J5IiwidXJsIjoiaHR0cDovL3JlcG9zaXRvcnktdXJsIiwiZGVmYXVsdEJyYW5jaCI6Im1haW4ifV0='
			)
		})

		it('can import a share string configuration', () => {
			const store = useRepositoryStore()

			store.import(
				'W3sib3duZXIiOiJ1c2VybmFtZSIsIm5hbWUiOiJyZXBvc2l0b3J5IiwidXJsIjoiaHR0cDovL3JlcG9zaXRvcnktdXJsIiwiZGVmYXVsdEJyYW5jaCI6Im1haW4ifV0='
			)

			expect(store.watched).toEqual([createRepository()])
		})
	})
})

const createRepository = (options: Partial<Repository> = {}): Repository => ({
	owner: 'username',
	name: 'repository',
	url: 'http://repository-url',
	defaultBranch: 'main',
	...options
})
