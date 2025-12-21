import { shallowMount } from '@vue/test-utils'
import BuildStatus from './build-status.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Wrapper } from '../../../test-utils.ts'
import IconComponent from '../icon/icon-component.vue'
import CustomButton from '../custom-button/custom-button.vue'

describe('BuildStatus component', () => {
	let buildStatus: Wrapper<typeof BuildStatus>

	beforeEach(() => {
		buildStatus = shallowMount(BuildStatus, {
			props: {
				url: 'http://build-link',
				description: 'a short description',
				state: 'SUCCESS'
			}
		})
	})

	describe('Link', () => {
		it('should display a link to the build', () => {
			const link = buildStatus.findComponent(CustomButton)

			expect(link.attributes().href).toBe('http://build-link')
		})

		it('should display a short description of the build as tooltip', () => {
			const link = buildStatus.findComponent(CustomButton)

			expect(link.attributes().title).toBe('a short description')
		})

		it('should use the state to display an icon', () => {
			const link = buildStatus.findComponent(CustomButton)

			expect(link.classes()).toEqual(expect.arrayContaining(['icon', 'SUCCESS']))
		})

		it("should allow some build status to not have an url (some bot don't add url to statuses on github)", async () => {
			const link = buildStatus.findComponent(CustomButton)

			await buildStatus.setProps({ url: undefined })

			expect(link.attributes().title).toBe('a short description')
			expect(link.classes()).toContain('SUCCESS')
		})
	})

	describe('Icons', () => {
		it('should map success status to check-circle icon', async () => {
			await buildStatus.setProps({ state: 'SUCCESS' })
			const icon = buildStatus.findComponent(IconComponent)

			expect(icon.attributes().icon).toBe('success')
		})

		it('should map failure status to exclamation-circle icon', async () => {
			await buildStatus.setProps({ state: 'FAILURE' })
			const icon = buildStatus.findComponent(IconComponent)

			expect(icon.attributes().icon).toBe('warning')
		})

		it('should map error status to times-circle icon', async () => {
			await buildStatus.setProps({ state: 'ERROR' })
			const icon = buildStatus.findComponent(IconComponent)

			expect(icon.attributes().icon).toBe('error')
		})

		it('should map pending status to clock icon', async () => {
			await buildStatus.setProps({ state: 'PENDING' })
			const icon = buildStatus.findComponent(IconComponent)

			expect(icon.attributes().icon).toBe('pending')
		})

		it('should map no status to clock icon', async () => {
			await buildStatus.setProps({ state: 'NO_STATUS' })
			const icon = buildStatus.findComponent(IconComponent)

			expect(icon.attributes().icon).toBe('pending')
		})
	})
})
