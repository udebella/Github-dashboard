import { shallowMount } from '@vue/test-utils'
import MainContainer from './main-container.vue'
import { beforeEach, describe, expect, it } from 'vitest'

describe('MainContainer component', () => {
	let mainContainer

	beforeEach(() => {
		mainContainer = shallowMount(MainContainer)
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(mainContainer.exists()).toBe(true)
		})

		it('should display configuration component', () => {
			expect(mainContainer.findComponent({ name: 'github-api-config' }).exists()).toBe(true)
		})

		it('should display repository list component', () => {
			expect(mainContainer.findComponent({ name: 'repository-list' }).exists()).toBe(true)
		})

		it('should display pull request list component', () => {
			expect(mainContainer.findComponent({ name: 'pull-request-list' }).exists()).toBe(true)
		})

		it('should display recently closed pull requests', () => {
			expect(mainContainer.findComponent({ name: 'recently-closed-pull-requests' }).exists()).toBe(true)
		})
	})
})
