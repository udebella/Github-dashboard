import {shallowMount} from '@vue/test-utils'
import {faCheckCircle, faClock, faExclamationCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {expect} from 'chai'
import BuildStatus from './build-status.vue'

describe('BuildStatus component', () => {
	let buildStatus

	beforeEach(() => {
		buildStatus = shallowMount(BuildStatus, {
			propsData: {
				url: 'http://build-link',
				description: 'a short description',
				state: 'SUCCESS',
			},
		})
	})

	describe('Initialisation', () => {
		it('should have build-status name', () => {
			expect(buildStatus.name()).to.equals('build-status')
		})
	})

	describe('Link', () => {
		let link

		beforeEach(() => {
			link = buildStatus.find('[data-test=link]')
		})

		it('should display a link to the build', () => {
			expect(link.attributes().href).to.equal('http://build-link')
		})

		it('should display a short description of the build as tooltip', () => {
			expect(link.attributes().title).to.equal('a short description')
		})

		it('should use the state to display an icon', () => {
			expect(link.classes()).to.deep.equal(['icon', 'SUCCESS'])
		})

		it('should allow some build status to not have an url (some bot don\'t add url to statuses on github)', () => {
			buildStatus = shallowMount(BuildStatus, {
				propsData: {
					description: 'a short description',
					state: 'SUCCESS',
				},
			})

			expect(link.attributes().title).to.equals('a short description')
			expect(link.classes()).to.contains('SUCCESS')
		})
	})

	describe('Icons', () => {
		it('should map success status to check-circle icon', () => {
			buildStatus.setProps({state: 'SUCCESS'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.exists()).to.be.true
			expect(icon.vm.$attrs.icon).to.deep.equal(faCheckCircle)
		})

		it('should map failure status to exclamation-circle icon', () => {
			buildStatus.setProps({state: 'FAILURE'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.exists()).to.be.true
			expect(icon.vm.$attrs.icon).to.deep.equal(faExclamationCircle)
		})

		it('should map error status to times-circle icon', () => {
			buildStatus.setProps({state: 'ERROR'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.exists()).to.be.true
			expect(icon.vm.$attrs.icon).to.deep.equal(faTimesCircle)
		})

		it('should map pending status to clock icon', () => {
			buildStatus.setProps({state: 'PENDING'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.exists()).to.be.true
			expect(icon.vm.$attrs.icon).to.deep.equal(faClock)
		})
	})
})
