import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import IconComponent from './icon-component.vue'

describe('Icon component', () => {
	it('displays an icon', () => {
		const wrapper = shallowMount(IconComponent, {
			props: {
				icon: 'warning'
			}
		})

		expect(wrapper.find('i').attributes().class).toBe('ri-error-warning-fill')
	})
})
