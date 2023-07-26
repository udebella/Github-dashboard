import {shallowMount} from '@vue/test-utils'
import UpdateIcon from './update-icon.vue'
import {describe, expect, it} from "vitest";

describe('UpdateIcon component', () => {
	describe('Initialization', () => {
		it('should mount properly', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})

			expect(updateIcon.exists()).toBe(true)
		})
	})

	describe('Display', () => {
		it('should display an update icon', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})
			const icon = updateIcon.findComponent('[data-test=icon]')

			expect(icon.attributes().icon).toBe("hasUpdates")
		})

		it('should display a title explaining the purpose of the icon', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})

			expect(updateIcon.attributes().title).toBe('There are new updates')
		})
	})
})
