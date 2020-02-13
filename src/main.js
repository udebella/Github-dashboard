import Vue from 'vue'
import App from './components/App'
import {store} from './store/store'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome/index.es'

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
	el: '#app',
	render: h => h(App),
	store,
})
