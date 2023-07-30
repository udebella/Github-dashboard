import { shallowMount } from '@vue/test-utils'
import DebouncedInput from './debounced-input.vue'
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'

describe('DebouncedInput component', () => {
	beforeEach(() => {
		vitest.useFakeTimers()
	})

	afterEach(() => {
		vitest.useRealTimers()
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			const debouncedInput = shallowMount(DebouncedInput)

			expect(debouncedInput.exists()).toBe(true)
		})

		it('should display a text input', () => {
			const debouncedInput = shallowMount(DebouncedInput)
			const input = debouncedInput.find('input')

			expect(input.exists()).toBe(true)
			expect(input.attributes().type).toBe('text')
		})
	})

	describe('Handling input data', () => {
		it('should send a input event after a while when modifying the input', async () => {
			const debouncedInput = shallowMount(DebouncedInput)

			await debouncedInput.find('input').setValue('test')
			vitest.advanceTimersByTime(1000)

			expect(debouncedInput.emitted('input')).toEqual([['test']])
		})

		it('should send event only once when there is less 1 sec between updates', async () => {
			const debouncedInput = shallowMount(DebouncedInput)
			const input = debouncedInput.find('input')

			input.setValue('test')
			vitest.advanceTimersByTime(500)
			await input.setValue('another test')
			vitest.advanceTimersByTime(1000)

			expect(debouncedInput.emitted('input')).toEqual([['another test']])
		})
	})
})
