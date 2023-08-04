import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './components/App.vue'
import { localStoragePlugin } from './stores/local-storage-plugin'

const app = createApp(App)

const pinia = createPinia()
pinia.use(localStoragePlugin)
app.use(pinia)

app.mount('#app')
