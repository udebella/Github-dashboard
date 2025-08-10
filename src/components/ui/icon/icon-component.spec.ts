import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import IconComponent from './icon-component.vue'

describe('Icon component', () => {
	let wrapper: VueWrapper

	beforeEach(() => {
		wrapper = shallowMount(IconComponent, { props: { icon: 'warning' } })
	})

	it('displays an icon', () => {
		expect(wrapper.find('i').attributes().class).toBe('ri-error-warning-fill')
	})

	it('has reactive icons', async () => {
		await wrapper.setProps({ icon: 'success' })

		expect(wrapper.find('i').attributes().class).toBe('ri-checkbox-circle-fill')
	})
})
