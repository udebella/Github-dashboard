import type { GDBuildStatus, GDJobStatus } from '../services/statuses/extract-statuses'

export type GDRepository = {
	name: string
	owner: string
	repositoryUrl: string
	branchStatus: GDJobStatus
	statusesList: GDBuildStatus[]
}
