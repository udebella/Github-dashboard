import { createRouter as createVueRouter, createWebHashHistory } from 'vue-router'
import App from '../components/App.vue'
import ConfigurationView from '../views/configuration-view.vue'
import LoginView from '../views/login-view.vue'

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
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView
	}
] as const

export type RoutesNames = (typeof routes)[number]['name']

export const createRouter = () => {
	return createVueRouter({
		history: createWebHashHistory('/Github-dashboard/'),
		routes: routes
	})
}
