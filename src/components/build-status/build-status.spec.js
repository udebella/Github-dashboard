import {shallowMount} from '@vue/test-utils'
import BuildStatus from './build-status.vue'
import {beforeEach, describe, expect, it} from "vitest";

describe('BuildStatus component', () => {
	let buildStatus

	beforeEach(() => {
		buildStatus = shallowMount(BuildStatus, {
			propsData: {
				url: 'http://build-link',
				description: 'a short description',
				state: 'SUCCESS',
			},
			global: {
				stubs: {
					fontAwesomeIcon: true
				},
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Initialisation', () => {
		it('should mount properly', () => {
			expect(buildStatus.exists()).toBe(true)
		})
	})

	describe('Link', () => {
		let link

		beforeEach(() => {
			link = buildStatus.find('[data-test=link]')
		})

		it('should display a link to the build', () => {
			expect(link.attributes().href).toBe('http://build-link')
		})

		it('should display a short description of the build as tooltip', () => {
			expect(link.attributes().title).toBe('a short description')
		})

		it('should use the state to display an icon', () => {
			expect(link.classes()).toEqual(expect.arrayContaining(['icon', 'SUCCESS']))
		})

		it('should allow some build status to not have an url (some bot don\'t add url to statuses on github)', () => {
			buildStatus = shallowMount(BuildStatus, {
				propsData: {
					description: 'a short description',
					state: 'SUCCESS',
				},
				global: {
					stubs: {
						fontAwesomeIcon: true
					}
				}
			})

			expect(link.attributes().title).toBe('a short description')
			expect(link.classes()).toContain('SUCCESS')
		})
	})

	describe('Icons', () => {
		it('should map success status to check-circle icon', async () => {
			await buildStatus.setProps({state: 'SUCCESS'})
			const icon = buildStatus.findComponent('[data-test=icon]')

			expect(icon.attributes().icon).toBe("fa-check-circle")
		})

		it('should map failure status to exclamation-circle icon', async () => {
			await buildStatus.setProps({state: 'FAILURE'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.attributes().icon).toBe("fa-exclamation-circle")
		})

		it('should map error status to times-circle icon', async () => {
			await buildStatus.setProps({state: 'ERROR'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.attributes().icon).toBe("fa-times-circle")
		})

		it('should map pending status to clock icon', async () => {
			await buildStatus.setProps({state: 'PENDING'})
			const icon = buildStatus.find('[data-test=icon]')

			expect(icon.attributes().icon).toBe("fa-clock")
		})
	})
})
