import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import UpdateIcon from './update-icon.vue'
import { describe, it } from "vitest";

describe('UpdateIcon component', () => {
	describe('Initialization', () => {
		it('should mount properly', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})

			expect(updateIcon.exists()).to.be.true
		})
	})

	describe('Display', () => {
		it('should display an update icon', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})
			const icon = updateIcon.findComponent('[data-test=icon]')

			expect(icon.attributes().icon).to.deep.equal("hasUpdates")
		})

		it('should display a title explaining the purpose of the icon', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})

			expect(updateIcon.attributes().title).to.equal('There are new updates')
		})
	})
})
