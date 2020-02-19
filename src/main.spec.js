import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
chai.use(sinonChai)
Vue.component('font-awesome-icon', {})

window.Notification = {permission: 'denied'} // TODO find a way to remove that use from notificationApi
