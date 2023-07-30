import {fileURLToPath} from 'node:url'
import {mergeConfig} from 'vite'
import {configDefaults, defineConfig} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			include: [...configDefaults.include, '**/*.feature.[jt]s'],
			exclude: [...configDefaults.exclude, 'e2e/*'],
			root: fileURLToPath(new URL('./', import.meta.url)),
			transformMode: {
				web: [/\.[jt]sx$/]
			},
	  		setupFiles: './src/test-setup.js'
		}
	})
)
