import Vue from 'vue';
import App from './components/App'

window.toto = new Vue({
    el: '#app',
    render: h => h(App),
})