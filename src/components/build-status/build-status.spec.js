import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import BuildStatus from './build-status.vue'

describe(`BuildStatus component`, () => {
	let buildStatus

	beforeEach(() => {
		buildStatus = shallowMount(BuildStatus, {
			propsData: {
				url: `http://build-link`,
				description: `a short description`,
				state: `SUCCESS`,
			},
		})
	})

	describe(`Initialisation`, () => {
		it(`should display a link to the build`, () => {
			expect(buildStatus.attributes().href).to.equal(`http://build-link`)
		})
		it(`should display a short description of the build as tooltip`, () => {
			expect(buildStatus.attributes().title).to.equal(`a short description`)
		})
		it(`should use the state to display an icon`, () => {
			expect(buildStatus.classes()).to.deep.equal([`icon`, `SUCCESS`])
		})
	})
})
