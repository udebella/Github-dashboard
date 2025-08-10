import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ShareConfiguration from './share-configuration.vue'
import CopyButton from '../ui/copy-button/copy-button.vue'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import type { Wrapper } from '../../test-utils.ts'

describe('ShareConfiguration component', () => {
	let shareConfiguration: Wrapper<typeof ShareConfiguration>

	beforeEach(() => {
		setActivePinia(createTestingPinia())
		shareConfiguration = shallowMount(ShareConfiguration)
	})

	it('displays copy to clipboard component with share-string', () => {
		expect(shareConfiguration.findComponent(CopyButton).props()).toEqual({ value: 'W10=' })
	})
})
