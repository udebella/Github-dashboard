import {shallowMount} from '@vue/test-utils'
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
})