import { describe, it, beforeEach, expect } from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {useConfigurationStore} from "@/stores/configuration";

describe('Configuration store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	});

	it('should use the public github api by default', () => {
		const store = useConfigurationStore()

		expect(store.githubApi).toBe('https://api.github.com/graphql')
	})

	it('should have configuration mode enabled by default', () => {
		const store = useConfigurationStore()

		expect(store.configurationEnabled).toBe(true)
	})

	it('should have a default time between refresh time of 30 seconds', () => {
		const store = useConfigurationStore()

		expect(store.timeBetweenRefresh).toBe(30)
	})
});
