import type {
	CheckRun,
	Maybe,
	StatusCheckRollup,
	StatusCheckRollupContext,
	StatusContext
} from '@octokit/graphql-schema'

export type GDPullRequestStatus = {
	buildStatus: GDJobStatus
	statuses: GDBuildStatus[]
}

export type GDJobStatus = 'PENDING' | 'SUCCESS' | 'FAILURE' | 'NO_STATUS'

export type GDBuildStatus = {
	description: string
	jobStatus: GDJobStatus
	jobUrl: string
}

export const extractStatuses = (check?: Maybe<StatusCheckRollup>): GDPullRequestStatus => {
	return {
		buildStatus: (check?.state ?? 'NO_STATUS') as GDJobStatus, // TODO remove this typescript bypass
		statuses: check?.contexts?.nodes?.map(extractStatusesDetails) ?? []
	}
}

const extractStatusesDetails = (rollupContext: Maybe<StatusCheckRollupContext>): GDBuildStatus => {
	const status = rollupContext!
	if (isStatus(status)) {
		return {
			description: status.context,
			jobStatus: status.state as GDJobStatus,
			jobUrl: status.targetUrl
		}
	}
	return {
		description: status.name,
		jobStatus: (status.conclusion as GDJobStatus) ?? 'PENDING',
		jobUrl: status.detailsUrl
	}
}

const isStatus = (context: StatusContext | CheckRun): context is StatusContext => {
	return 'context' in context
}
