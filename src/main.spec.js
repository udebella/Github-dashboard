import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
chai.use(sinonChai)
Vue.component(`font-awesome-icon`, {})

// Require all project javascript files for coverage
const requireAll = r => r.keys().forEach(r)
requireAll((require).context(`./`, true, /\/(.*)\/(.*)\.(spec|feature)\.js$/))
