import { shallowMount } from '@vue/test-utils'
import UpdateIcon from './update-icon.vue'
import { describe, expect, it } from 'vitest'
import IconComponent from '../icon/icon-component.vue'

describe('UpdateIcon component', () => {
	describe('Display', () => {
		it('should display an update icon', () => {
			const updateIcon = shallowMount(UpdateIcon)
			const icon = updateIcon.findComponent(IconComponent)

			expect(icon.attributes().icon).toBe('hasUpdates')
		})

		it('should display a title explaining the purpose of the icon', () => {
			const updateIcon = shallowMount(UpdateIcon)

			expect(updateIcon.attributes().title).toBe('There are new updates')
		})
	})
})
