import { beforeEach, describe, expect, it } from 'vitest'
import type { RoutesNames } from './router'
import { createRouter } from './router'
import type { Router } from 'vue-router'

describe('Router', () => {
	let router: Router
	beforeEach(() => {
		router = createRouter()
	})

	const routes: RoutesNames[] = ['home']
	routes.forEach((name) => {
		it(`should render the route ${name}`, async () => {
			await router.push({ name })

			expect(router.currentRoute.value.name).toBe(name)
		})
	})
})
