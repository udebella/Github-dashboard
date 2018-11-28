import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import Vue from 'vue'
import Vuex from 'vuex'
import AsyncComputed from 'vue-async-computed'

Vue.use(Vuex)
Vue.use(AsyncComputed)
chai.use(sinonChai)
Vue.component('font-awesome-icon', {})
