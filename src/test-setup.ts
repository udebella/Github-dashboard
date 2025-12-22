import { config } from '@vue/test-utils'

// TODO this hack is used because jsdom does not mock Notification API
// see https://github.com/jsdom/jsdom/issues/1862
window.Notification = {
	permission: 'denied'
} as never

config.global.renderStubDefaultSlot = true
