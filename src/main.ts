import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { localStoragePlugin } from './stores/local-storage-plugin'
import { createRouter } from './router/router'
import ApplicationLayout from './components/ApplicationLayout.vue'

const app = createApp(ApplicationLayout)

const pinia = createPinia()
pinia.use(localStoragePlugin)
app.use(pinia)
app.use(createRouter())

app.mount('#app')
