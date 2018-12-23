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
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url',
				}],
			},
		})
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(pullRequestLine.name()).to.equal('pull-request-line')
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
			expect(livingIcon.props().date).to.equals(today)
		})
	})

	describe('Build statuses', () => {
		let buildStatuses

		beforeEach(() => {
			buildStatuses = pullRequestLine.find({name: 'build-statuses'})
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
				},
			})

			buildStatuses = pullRequestLine.find({name: 'build-statuses'})
			expect(buildStatuses.exists()).to.be.false
		})
	})
})
