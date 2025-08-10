import { shallowMount } from '@vue/test-utils'
import DebouncedInput from './debounced-input.vue'
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Wrapper } from '../../../test-utils.ts'

describe('DebouncedInput component', () => {
	let debouncedInput: Wrapper<typeof DebouncedInput>
	beforeEach(() => {
		vitest.useFakeTimers()
		debouncedInput = shallowMount(DebouncedInput)
	})

	afterEach(() => {
		vitest.useRealTimers()
	})

	describe('Initialization', () => {
		it('displays a text input', () => {
			const input = debouncedInput.find('input')

			expect(input.attributes().type).toBe('text')
		})
	})

	describe('Handling input data', () => {
		it('sends a input event after a while when modifying the input', async () => {
			await debouncedInput.find('input').setValue('test')
			vitest.advanceTimersByTime(1000)

			expect(debouncedInput.emitted('input')).toEqual([['test']])
		})

		it('sends event only once when there is less 1 sec between updates', async () => {
			const input = debouncedInput.find('input')

			await input.setValue('test')
			vitest.advanceTimersByTime(500)
			await input.setValue('another test')
			vitest.advanceTimersByTime(1000)

			expect(debouncedInput.emitted('input')).toEqual([['another test']])
		})
	})
})
