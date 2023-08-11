import type { GDBuildStatus } from '../services/statuses/extract-statuses'

export type GDRepository = {
	name: string
	owner: string
	repositoryUrl: string
	branchStatus: string
	statusesList: GDBuildStatus[]
}
