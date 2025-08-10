import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ShareConfiguration from './share-configuration.vue'
import CopyButton from '../ui/copy-button/copy-button.vue'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import type { Wrapper } from '../../test-utils.ts'
import { useRepositoryStore } from '../../stores/repositories/repositories.ts'
import PasteButton from '../ui/paste-button/paste-button.vue'

describe('ShareConfiguration component', () => {
	let shareConfiguration: Wrapper<typeof ShareConfiguration>

	beforeEach(() => {
		setActivePinia(createTestingPinia())
		shareConfiguration = shallowMount(ShareConfiguration)
	})

	it('displays copy to clipboard component with share-string', () => {
		expect(shareConfiguration.findComponent(CopyButton).props()).toEqual({ value: 'W10=' })
	})

	it('displays paste from clipboard component', () => {
		expect(shareConfiguration.findComponent(PasteButton).exists()).toBe(true)
	})

	it('load shared configuration when clicking the paste button', async () => {
		await shareConfiguration.findComponent(PasteButton).vm.$emit('paste', 'share-string')

		expect(useRepositoryStore().import).toHaveBeenCalledWith('share-string')
	})

	it('displays the list of repositories', async () => {
		await useRepositoryStore().$patch({ watched: [{ name: 'repository', owner: 'owner' }] })

		expect(shareConfiguration.find('[data-test=repositories]').text()).toEqual(`[
  {
    "name": "repository",
    "owner": "owner"
  }
]`)
	})
})
