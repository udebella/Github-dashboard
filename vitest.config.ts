import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'happy-dom',
			include: [...configDefaults.include, '**/*.feature.[jt]s'],
			exclude: [...configDefaults.exclude, 'e2e/*'],
			root: fileURLToPath(new URL('./', import.meta.url)),
			globals: true,
			setupFiles: './src/test-setup.js',
			coverage: {
				all: true,
				reporter: ['text-summary', 'text', 'html', 'cobertura']
			}
		}
	})
)
