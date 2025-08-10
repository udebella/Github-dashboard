import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import ShareConfiguration from './share-configuration.vue'
import CopyButton from '../ui/copy-button/copy-button.vue'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

describe('ShareConfiguration component', () => {
	let shareConfiguration: VueWrapper

	beforeEach(() => {
		setActivePinia(createTestingPinia())
		shareConfiguration = shallowMount(ShareConfiguration)
	})

	it('displays copy to clipboard component with share-string', () => {
		expect(shareConfiguration.findComponent(CopyButton).props()).toEqual({ value: 'W10=' })
	})
})
