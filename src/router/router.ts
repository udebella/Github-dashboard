import { createRouter as createVueRouter, createWebHistory } from 'vue-router'
import App from '../components/App.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: App
	}
]

export type RoutesNames = (typeof routes)[number]['name']

export const createRouter = () => {
	return createVueRouter({
		history: createWebHistory(),
		routes: routes
	})
}
