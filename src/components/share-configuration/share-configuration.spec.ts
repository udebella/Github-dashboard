import { describe, beforeEach, it, expect} from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import ShareConfiguration from './share-configuration.vue'

describe('ShareConfiguration component', () => {
	let shareConfiguration: VueWrapper;

	beforeEach(() => {
		shareConfiguration = shallowMount(ShareConfiguration)
	})

	it('should display the component', () => {
		expect(shareConfiguration.text()).toBe('Test component')
	})
})
