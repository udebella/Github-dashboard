import { shallowMount, type VueWrapper } from '@vue/test-utils'
import BuildStatuses from './build-statuses.vue'
import { beforeEach, describe, expect, it } from 'vitest'

describe('BuildStatuses component', () => {
	let buildStatuses: VueWrapper

	beforeEach(() => {
		buildStatuses = shallowMount(BuildStatuses, { props: { statuses: [] } })
	})

	it('does not display when there is no status', () => {
		expect(buildStatuses.html()).toBe('')
	})

	it('display statuses', async () => {
		const status = {
			description: 'description',
			jobUrl: 'http://build-url',
			jobStatus: 'SUCCESS'
		}
		await buildStatuses.setProps({ statuses: [status] })

		const buildStatus = buildStatuses.findComponent({ name: 'build-status' })
		expect(buildStatus.props()).toEqual({
			description: 'description',
			url: 'http://build-url',
			state: 'SUCCESS'
		})
	})
})
