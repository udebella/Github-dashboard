import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import Login from './login.vue'
import {NO_USER} from "../../services/session/session"

describe(`Login component`, () => {
	let mocks

	beforeEach(() => {
		mocks = {
			userService: {
				login: stub(),
				connectedUser: stub(),
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
			mocks.userService.connectedUser.returns(NO_USER)
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
			mocks.userService.connectedUser.returns(NO_USER)
			const login = shallowMount(Login, {propsData: mocks})

			login.find(`[data-test=input-token]`).setValue(`test`)

			expect(mocks.userService.login).to.have.been.calledWith(`test`)
		})
	})
})
