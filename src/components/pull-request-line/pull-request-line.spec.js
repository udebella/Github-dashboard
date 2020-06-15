import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import PullRequestLine from './pull-request-line.vue'

describe('PullRequestLine component', () => {
	let pullRequestLine
	const today = new Date()

	beforeEach(() => {
		pullRequestLine = shallowMount(PullRequestLine, {
			propsData: {
				title: 'Pull request name',
				url: 'http://pull-request-url',
				buildStatus: 'SUCCESS',
				creationDate: today,
				hasUpdates: true,
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url',
				}],
			},
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(pullRequestLine.exists()).to.be.true
		})
	})

	describe('Display', () => {
		it('should display the pull request name', () => {
			expect(pullRequestLine.find('[data-test=name]').text()).to.equal('Pull request name')
		})

		it('should display a link to the pull request', () => {
			expect(pullRequestLine.find('[data-test=link]').attributes().href).to.equal('http://pull-request-url')
		})

		it('should display the build status of the pull request', () => {
			expect(pullRequestLine.find('[data-test=name]').classes()).to.deep.equal(['line', 'SUCCESS'])
		})

		it('should display a living icon', () => {
			const livingIcon = pullRequestLine.find('[data-test=living-icon]')

			expect(livingIcon.exists()).to.be.true
			expect(livingIcon.props().date).to.equal(today)
		})

		it('should display an update icon', () => {
			const updateIcon = pullRequestLine.find('[data-test=update-icon]')

			expect(updateIcon.exists()).to.be.true
		})

		it('should not display the update icon when there are no updates', () => {
			pullRequestLine = shallowMount(PullRequestLine, {
				propsData: {
					title: 'Pull request name',
					url: 'http://pull-request-url',
					buildStatus: 'SUCCESS',
					creationDate: today,
					hasUpdates: false,
					statusesList: [{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url',
					}],
				},
			})
			const updateIcon = pullRequestLine.find('[data-test=update-icon]')

			expect(updateIcon.exists()).to.be.false
		})
	})

	describe('Build statuses', () => {
		let buildStatuses

		beforeEach(() => {
			buildStatuses = pullRequestLine.findComponent({name: 'build-statuses'})
		})

		it('should display build statuses', () => {
			expect(buildStatuses.exists()).to.be.true
		})

		it('should give the list of statuses to the component', () => {
			expect(buildStatuses.props().statuses).to.deep.equal([{
				jobStatus: 'SUCCESS',
				description: 'build description',
				jobUrl: 'http://build-target-url',
			}])
		})

		it('should not display build statuses when there is no build status associated with the commit', () => {
			pullRequestLine = shallowMount(PullRequestLine, {
				propsData: {
					title: 'Pull request name',
					url: 'http://pull-request-url',
					buildStatus: 'SUCCESS',
					creationDate: today,
					hasUpdates: true,
				},
			})

			buildStatuses = pullRequestLine.findComponent({name: 'build-statuses'})
			expect(buildStatuses.exists()).to.be.false
		})
	})
})
