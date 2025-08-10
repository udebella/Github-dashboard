import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import TimeBetweenRefresh from './time-between-refresh.vue'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

describe('TimeBetweenRefresh component', () => {
	let wrapper: VueWrapper

	beforeEach(() => {
		setActivePinia(createTestingPinia())
		wrapper = shallowMount(TimeBetweenRefresh)
	})

	it('displays a label for the input', async () => {
		const label = wrapper.find('label[data-test=time-between-refresh]')

		expect(label.text()).toBe('Time to wait between refreshes (in seconds)')
	})

	it('displays an input for setting time between refreshes', async () => {
		useConfigurationStore().$patch({ timeBetweenRefresh: 30 })

		const timeBetweenRefresh = wrapper.find('[data-test=time-between-refresh]').find('input')

		expect(timeBetweenRefresh.attributes()).toEqual({ type: 'number', value: '30' })
	})

	it('updates time between refresh', async () => {
		const timeBetweenRefresh = wrapper.find('[data-test=time-between-refresh]').find('input')

		await timeBetweenRefresh.setValue(60)

		expect(useConfigurationStore().updateTimeBetweenRefresh).toHaveBeenCalledWith(60)
	})
})
