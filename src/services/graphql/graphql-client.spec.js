import { buildRequest } from './graphql-client'
import { NO_USER } from '../session/session'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigurationStore } from '../../stores/configuration/configuration'

describe('Service: graphql-client', () => {
	let request
	let mocks

	beforeEach(() => {
		setActivePinia(createPinia())
		useConfigurationStore().$patch({ githubApi: 'http://github-api' })
		mocks = {
			builder: vitest.fn(() => ({
				request: mocks.fakeRequest
			})),
			fakeRequest: vitest.fn(),
			session: {
				getUser: vitest.fn().mockReturnValue(NO_USER)
			}
		}
		request = buildRequest(mocks)
	})

	describe('Method request', () => {
		it('should retrieve user from session before making a request', async () => {
			await request('someQuery')

			expect(mocks.session.getUser).toHaveBeenCalled()
		})

		it('should build a graphqlClient properly', async () => {
			mocks.session.getUser.mockReturnValue({ token: 'userToken' })

			await request('someQuery')

			expect(mocks.builder).toHaveBeenCalledWith('http://github-api', {
				headers: { Authorization: 'token userToken' }
			})
		})

		it('should call request method from graphql client', async () => {
			await request('fakeQuery')

			expect(mocks.fakeRequest).toHaveBeenCalledWith('fakeQuery')
		})

		it('should return a promise', async () => {
			mocks.fakeRequest.mockResolvedValue('value')

			const response = await request('fakeQuery')

			expect(response).toBe('value')
		})
	})
})
