import {shallowMount} from '@vue/test-utils'
import App from './App.vue'
import { describe, beforeEach, it, expect } from "vitest";

describe('Component App', () => {
	let app

	beforeEach(() => {
		app = shallowMount(App)
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(app.exists()).toBe(true)
		})

		it('should display a header', () => {
			expect(app.findComponent({name: 'dashboard-header'}).exists()).toBe(true)
		})

		it('should display the main container', () => {
			expect(app.findComponent({name: 'main-container'}).exists()).toBe(true)
		})
	})
})
