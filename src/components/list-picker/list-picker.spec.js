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
})