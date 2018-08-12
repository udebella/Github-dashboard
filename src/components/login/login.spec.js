import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Login from './login.vue'

describe(`Login component`, () => {
	let login

	beforeEach(() => {
		login = shallowMount(Login)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(login.name()).to.equal(`login`)
		})

		it(`should display a login icon`, () => {
			const icon = login.find({name: `font-awesome-icon`})

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equals(`user`)
		})
	})
})
