import {expect} from 'chai'
import {StoreInit} from './store-init-plugin'

describe('Init store', () => {

	describe('Initialization', () => {
		it('should be a function to give to vuex', () => {
			expect(StoreInit).to.be.a('function')
		})
	})
})
