import {shallowMount} from '@vue/test-utils'
import ItemPicker from './item-picker.vue'
import {expect} from 'chai'

describe(`Item-picker component`, () => {
    describe(`Initialization`, () => {
        it(`should display the label of the item`, () => {
            const wrapper = shallowMount(ItemPicker, {propsData: {item: `test`}})

            expect(wrapper.find(`label`).text()).to.equal(`test`)
        })

        it(`should display the label of the item`, () => {
            const wrapper = shallowMount(ItemPicker)

            expect(wrapper.find(`label`).text()).to.equal(`test`)
        })
    })

    describe(`notifyParent`, () => {
        it(`should send a tick event when item is checked`, () => {
            // Given
            const wrapper = shallowMount(ItemPicker, {propsData: {item: `test`}})
            const check = wrapper.find(`input`)

            // When
            check.element.checked = true
            check.trigger(`input`)

            // Then
            expect(wrapper.emitted(`tick`).length).to.equal(1)
            expect(wrapper.emitted(`tick`)[0]).to.deep.equal([`test`])
        })

        it(`should send an untick event when item is not checked`, () => {
            // Given
            const wrapper = shallowMount(ItemPicker, {propsData: {item: `test`}})
            const check = wrapper.find(`input`)

            // When
            check.element.checked = false
            check.trigger(`input`)

            // Then
            expect(wrapper.emitted(`untick`).length).to.equal(1)
            expect(wrapper.emitted(`untick`)[0]).to.deep.equal([`test`])
        })
    })
})