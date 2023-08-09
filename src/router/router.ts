import { createRouter as createVueRouter, createWebHashHistory } from 'vue-router'
import App from '../components/App.vue'
import ConfigurationView from '../views/configuration-view.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: App
	},
	{
		path: '/configuration',
		name: 'configuration',
		component: ConfigurationView
	}
]

export type RoutesNames = (typeof routes)[number]['name']

export const createRouter = () => {
	return createVueRouter({
		history: createWebHashHistory('/Github-dashboard/'),
		routes: routes
	})
}
