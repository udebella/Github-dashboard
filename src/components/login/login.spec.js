import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import Login from './login.vue'
import {NO_USER} from "../../services/session/session"
import flushPromises from 'flush-promises'

describe(`Login component`, () => {
	let mocks

	beforeEach(() => {
		mocks = {
			userService: {
				login: stub(),
				connectedUser: stub().returns(NO_USER),
			},
		}
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			const login = shallowMount(Login, {propsData: mocks})

			expect(login.name()).to.equal(`login`)
		})

		it(`should display a login icon`, () => {
			const login = shallowMount(Login, {propsData: mocks})
			const icon = login.find(`[data-test=icon]`)

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equals(`user`)
		})

		it(`should display an input text to enter token when there is no connected user in session`, () => {
			const login = shallowMount(Login, {propsData: mocks})

			const inputToken = login.find(`[data-test=input-token]`)

			expect(inputToken.exists()).to.be.true
		})

		it(`should not display the input text by default when there is a connected user in session`, () => {
			mocks.userService.connectedUser.returns({
				login: `user`,
				token: `token`,
			})
			const login = shallowMount(Login, {propsData: mocks})

			const inputToken = login.find(`[data-test=input-token]`)

			expect(inputToken.exists()).to.be.false
		})
	})

	describe(`Login`, () => {
		it(`should trigger a login when updating input data`, () => {
			const login = shallowMount(Login, {propsData: mocks})

			login.find(`[data-test=input-token]`).setValue(`test`)

			expect(mocks.userService.login).to.have.been.calledWith(`test`)
		})

		it(`should hide input and display username as title on the icon when successfully logged in`, async () => {
			// Given
			mocks.userService.connectedUser
				.onCall(0).returns(NO_USER)
				.returns({login: `user`, token: `token`})
			mocks.userService.login.returns(Promise.resolve({success: {login: `user`, token: `token`}}))
			const login = shallowMount(Login, {propsData: mocks, attachToDocument: true})

			// When
			login.find(`[data-test=input-token]`).setValue(`token`)
			await flushPromises()

			// Then
			expect(login.find(`[data-test=input-token]`).exists()).to.be.false
			expect(login.find(`[data-test=icon]`).attributes().title).to.equals(`user`)
		})
	})
})
