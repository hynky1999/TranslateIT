// Vite can't build multiple targetsa as self-contained apps, so we need to build for each target separately.

import { build  } from 'vite'
import config  from './vite.config.js'
import fs from 'fs-extra'
console.log('Building for Chrome...')

// Remove dist folder
fs.removeSync('./dist')
for (let input of Object.keys(config.build.rollupOptions.input)) {
    console.log(`Building ${input}...`)
    const inputConfig = {
        ...config,
        build: {
            ...config.build,
            emptyOutDir: false,
            rollupOptions: {
                ...config.build.rollupOptions,
                input: {
                    [input]: config.build.rollupOptions.input[input]
                },
            }
        }
    }
    console.log(inputConfig.build.rollupOptions.input)
    await build({
        configFile: false,
        root: './',
        ...inputConfig
    })
}


console.log('Copying static files...')
// Copy manifest.json and assets to dist
// Using node.js
fs.copySync('./manifest.json', './dist/manifest.json')
fs.copySync('./assets', './dist/assets')