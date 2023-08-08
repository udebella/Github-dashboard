import { shallowMount, type VueWrapper } from '@vue/test-utils'
import BuildStatuses from './build-statuses.vue'
import { beforeEach, describe, expect, it } from 'vitest'

describe('BuildStatuses component', () => {
	let buildStatuses: VueWrapper

	describe('without status', () => {
		beforeEach(() => {
			buildStatuses = shallowMount(BuildStatuses, {
				propsData: {
					statuses: []
				}
			})
		})

		describe('Initialisation', () => {
			it('should not display when there is no status', () => {
				expect(buildStatuses.find('div').exists()).toBe(false)
			})
		})
	})

	describe('with statuses', () => {
		beforeEach(() => {
			buildStatuses = shallowMount(BuildStatuses, {
				propsData: {
					statuses: [
						{
							description: 'description',
							jobUrl: 'http://build-url',
							jobStatus: 'SUCCESS'
						}
					]
				}
			})
		})

		describe('Initialisation', () => {
			it('should display statuses', () => {
				const buildStatus = buildStatuses.findComponent({ name: 'build-status' })
				expect(buildStatus.exists()).toBe(true)
				expect(buildStatus.props()).toEqual({
					description: 'description',
					url: 'http://build-url',
					state: 'SUCCESS'
				})
			})
		})
	})
})
