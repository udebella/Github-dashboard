import {defineStore} from 'pinia'

type Repository = {
	name: string,
	owner: string
}

type State = {
	watched: Repository[]
}

export const useRepositoryStore = defineStore('repository', {
 state: (): State => ({
	 watched: []
 }),
	actions: {
	 addRepository(repository: Repository) {
		 this.watched.push(repository)
	 }
	}
})
