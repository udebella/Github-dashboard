import { defineStore } from 'pinia'

type Repository = {
	name: string
	owner: string
}

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
		removeRepository(repository: Repository) {
			this.watched = this.watched.filter(differentFrom(repository))
		}
	}
})

const differentFrom = (first: Repository) => (second: Repository) => {
	return first.name !== second.name || first.owner !== second.owner
}
