import ItemPicker from './item-picker.vue'
import {expect} from 'chai'

describe(`Item-picker component`, () => {
    it(`data should be a function`, () => {
        expect(typeof ItemPicker.data).to.equal(`function`)
    })

    it(`should set correct default data`, () => {
        const data = ItemPicker.data()

        expect(data).to.deep.equal({isChecked: false})
    })
})