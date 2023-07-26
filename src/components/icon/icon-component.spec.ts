import {describe, expect, it} from "vitest";
import {shallowMount} from "@vue/test-utils";
import IconComponent from "@/components/icon/icon-component.vue";

describe('Icon component', () => {
	it('displays an icon', () => {
		const wrapper = shallowMount(IconComponent, {
			props: {
				icon: 'warning'
			}
		})

		expect(wrapper.find('i').attributes().class).toBe('ri-error-warning-fill')
	});
	it('displays an icon 2', () => {
		const wrapper = shallowMount(IconComponent, {
			props: {
				icon: 'error'
			}
		})

		expect(wrapper.find('i').attributes().class).toBe('ri-close-circle-fill')
	});
});
