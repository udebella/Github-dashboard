import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ShareConfiguration from './share-configuration.vue'
import CopyButton from '../ui/copy-button/copy-button.vue'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import type { Wrapper } from '../../test-utils.ts'
import { useRepositoryStore } from '../../stores/repositories/repositories.ts'

describe('ShareConfiguration component', () => {
	let shareConfiguration: Wrapper<typeof ShareConfiguration>

	beforeEach(() => {
		setActivePinia(createTestingPinia())
		shareConfiguration = shallowMount(ShareConfiguration)
	})

	it('displays copy to clipboard component with share-string', () => {
		expect(shareConfiguration.findComponent(CopyButton).props()).toEqual({ value: 'W10=' })
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
