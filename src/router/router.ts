import { createRouter as createVueRouter, createWebHashHistory } from 'vue-router'
import App from '../components/App.vue'
import ConfigurationView from '../views/configuration-view.vue'
import LoginView from '../views/login-view.vue'
import { buildUserService } from '../services/user/user'
import { NO_USER } from '../services/session/session'

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

// TODO move this type to the proper place
type User =
	| {
			login: string
			token: string
	  }
	| typeof NO_USER

export type Dependencies = {
	connectedUser: () => User
}

const defaultDependencies = { connectedUser: buildUserService().connectedUser }
export const createRouter = ({ connectedUser }: Dependencies = defaultDependencies) => {
	const router = createVueRouter({
		history: createWebHashHistory('/Github-dashboard/'),
		routes: routes
	})

	router.beforeEach((to) => {
		if (connectedUser() === NO_USER && to.name !== 'login') {
			return 'login'
		}
	})

	return router
}
