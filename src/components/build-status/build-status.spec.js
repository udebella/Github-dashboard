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
		it(`should have build-status name`, () => {
			expect(buildStatus.name()).to.equals(`build-status`)
		})

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

	describe(`Icons`, () => {
		it(`should map success status to check-circle icon`, () => {
			buildStatus.setProps({state: `SUCCESS`})
			const icon = buildStatus.find(`[data-test=icon]`)

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equal(`check-circle`)
		})

		it(`should map failure status to exclamation-circle icon`, () => {
			buildStatus.setProps({state: `FAILURE`})
			const icon = buildStatus.find(`[data-test=icon]`)

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equal(`exclamation-circle`)
		})

		it(`should map error status to times-circle icon`, () => {
			buildStatus.setProps({state: `ERROR`})
			const icon = buildStatus.find(`[data-test=icon]`)

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equal(`times-circle`)
		})

		it(`should map pending status to clock icon`, () => {
			buildStatus.setProps({state: `PENDING`})
			const icon = buildStatus.find(`[data-test=icon]`)

			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.equal(`clock`)
		})
	})
})
