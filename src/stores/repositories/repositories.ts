import { defineStore } from 'pinia'

export type Repository = {
	name: string
	owner: string
	url: string
	defaultBranch: string
}

type UnicRepositoryKey = Pick<Repository, 'name' | 'owner'>

type State = {
	watched: Repository[]
}
export const useRepositoryStore = defineStore('repository', {
	state: (): State => ({
		watched: []
	}),
	getters: {
		shareString: (state) => btoa(JSON.stringify(state.watched))
	},
	actions: {
		addRepository(repository: Repository) {
			if (this.watched.every(differentFrom(repository))) {
				this.watched = [...this.watched, repository].sort(({ name: first }, { name: second }) =>
					first.localeCompare(second)
				)
			}
		},
		removeRepository(repository: UnicRepositoryKey) {
			this.watched = this.watched.filter(differentFrom(repository))
		},
		import(shareString: string) {
			this.watched = JSON.parse(atob(shareString))
		}
	}
})

const differentFrom = (first: UnicRepositoryKey) => (second: UnicRepositoryKey) => {
	return first.name !== second.name || first.owner !== second.owner
}
