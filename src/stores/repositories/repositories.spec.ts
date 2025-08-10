import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRepositoryStore } from './repositories'

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
			const repository = { owner: 'username', name: 'repository' }

			store.addRepository(repository)

			expect(store.watched).toEqual([repository])
		})

		it('allows to add multiple repositories for an user ordered by name', () => {
			const store = useRepositoryStore()

			const firstRepository = { owner: 'user', name: 'repository' }
			store.addRepository(firstRepository)
			const repository = { owner: 'username', name: 'another repository' }
			store.addRepository(repository)

			expect(store.watched).toEqual([repository, firstRepository])
		})

		it('does not allow to add twice the same repository', () => {
			const store = useRepositoryStore()

			const repository = { owner: 'user', name: 'repository' }
			store.addRepository(repository)
			store.addRepository(repository)

			expect(store.watched).toEqual([repository])
		})
	})

	describe('removeRepository', () => {
		it('removes watched repository for the username', () => {
			const store = useRepositoryStore()
			store.addRepository({ owner: 'user', name: 'repository' })

			store.removeRepository({ owner: 'user', name: 'repository' })

			expect(store.watched).toEqual([])
		})

		it('only removes the specified repository and keep the others', () => {
			const store = useRepositoryStore()
			store.addRepository({ owner: 'user', name: 'repository' })
			store.addRepository({ owner: 'user', name: 'secondRepository' })

			store.removeRepository({ owner: 'user', name: 'repository' })

			expect(store.watched).toEqual([{ owner: 'user', name: 'secondRepository' }])
		})
	})

	describe('shareConfiguration', () => {
		it('exposes a string in base64 to share configuration', () => {
			const store = useRepositoryStore()
			store.addRepository({ owner: 'user', name: 'repository' })

			expect(store.shareString).toBe('W3sib3duZXIiOiJ1c2VyIiwibmFtZSI6InJlcG9zaXRvcnkifV0=')
		})
	})
})
