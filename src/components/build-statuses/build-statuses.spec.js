import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import BuildStatuses from './build-statuses.vue'

describe('BuildStatuses component', () => {
	let buildStatuses

	describe('without status', () => {
		beforeEach(() => {
			buildStatuses = shallowMount(BuildStatuses, {
				propsData: {
					statuses: [],
				},
			})
		})

		describe('Initialisation', () => {
			it('should have branch-status name', () => {
				expect(buildStatuses.exists()).to.be.true
			})

			it('should not display when there is no status', () => {
				expect(buildStatuses.find('div').exists()).to.be.false
			})
		})
	})

	describe('with statuses', () => {
		beforeEach(() => {
			buildStatuses = shallowMount(BuildStatuses, {
				propsData: {
					statuses: [{
						description: 'description',
						jobUrl: 'http://build-url',
						jobStatus: 'SUCCESS',
					}],
				},
			})
		})

		describe('Initialisation', () => {
			it('should display statuses', () => {
				const buildStatus = buildStatuses.findComponent({name: 'build-status'})
				expect(buildStatus.exists()).to.be.true
				expect(buildStatus.props()).to.deep.equals({
					description: 'description',
					url: 'http://build-url',
					state: 'SUCCESS',
				})
			})
		})
	})
})
