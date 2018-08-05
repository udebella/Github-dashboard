import {expect} from 'chai'
import {mutations} from './store'

describe(`Store`, () => {
	describe(`addRepositories`, () => {
		const {addRepositories} = mutations
		it(`should set repositories for the username`, () => {
			const store = {}

			addRepositories(store, `username`, [`repository`])

			expect(store.username.repositories).to.deep.equal([`repository`])
		})

		it(`should allow to add new repositories for an user`, () => {
			const store = {username: { repositories: [`another repository`] }}

			addRepositories(store, `username`, [`repository`])

			expect(store.username.repositories).to.deep.equal([`another repository`, `repository`])
		})
	})

	describe(`removeRepositories`, () => {
		const {removeRepositories} = mutations

		it(`should remove repositories for the username`, () => {
			const store = {username: { repositories: [`repository`] }}

			removeRepositories(store, `username`, [`repository`])

			expect(store.username.repositories).to.deep.equal([])
		})

		it(`should only remove repositories `, () => {
			const store = {username: { repositories: [`repository`, `another repository`] }}

			removeRepositories(store, `username`, [`repository`])

			expect(store.username.repositories).to.deep.equal([`another repository`])
		})
	})
})
