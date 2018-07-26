import {shallowMount, mount} from '@vue/test-utils'
import ListPicker from './list-picker.vue'
import {expect} from 'chai'

describe(`List-picker component`, () => {
    describe(`Initialization`, () => {
        it(`should have list required property`, () => {
            const wrapper = shallowMount(ListPicker, {propsData: {list: [`test`]}})

            expect(wrapper.props().list).to.exist
        })
    })

    describe(`Update`, () => {
        it(`should reset tickedItems after each props udpate`, () => {
            const wrapper = shallowMount(ListPicker, {propsData: {list: [`test`]}})
            wrapper.setData({tickedItems : [`blabla`]})

            wrapper.setProps({list: [`test`]})

            expect(wrapper.vm.$data).to.deep.equals({tickedItems: []})
        })
    })

    describe(`Method: tick`, () => {
        it(`should send an update event with the new value`, () => {
            // Given
            const wrapper = shallowMount(ListPicker, {propsData: {list: [`test`]}})

            // When
            wrapper.vm.tick(`testValue`)

            // Then
            expect(wrapper.emitted(`update`).length).to.equal(1)
            expect(wrapper.emitted(`update`)[0]).to.deep.equal([[`testValue`]])
        })

        it(`should keep previously set tickedItems`, () => {
            // Given
            const wrapper = mount(ListPicker, {propsData: {list: [`test`]}})
            wrapper.setData({tickedItems: [`previousData`]})

            // When
            wrapper.vm.tick(`testValue`)

            // Then
            expect(wrapper.emitted(`update`).length).to.equal(1)
            expect(wrapper.emitted(`update`)[0]).to.deep.equal([[`previousData`, `testValue`]])
        })
    })

    describe(`Method: untick`, () => {
        it(`should send an update event with the new value`, () => {
            // Given
            const wrapper = shallowMount(ListPicker, {propsData: {list: [`test`]}})

            // When
            wrapper.vm.untick(`testValue`)

            // Then
            expect(wrapper.emitted(`update`).length).to.equal(1)
            expect(wrapper.emitted(`update`)[0]).to.deep.equal([[]])
        })

        it(`should remove previously set tickedItems`, () => {
            // Given
            const wrapper = mount(ListPicker, {propsData: {list: [`test`]}})
            wrapper.setData({tickedItems: [`previousData`]})

            // When
            wrapper.vm.untick(`previousData`)

            // Then
            expect(wrapper.emitted(`update`).length).to.equal(1)
            expect(wrapper.emitted(`update`)[0]).to.deep.equal([[]])
        })
    })
})