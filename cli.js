#!/usr/bin/env node
import _ from 'lodash'
import {buildInfo} from './lib/utils.js'
import chalk from 'chalk'
import chokidar from 'chokidar'
import CleanCSS from 'clean-css'
import connect from 'connect'
import fs from 'fs-extra'
import globby from 'globby'
import globImporter from 'node-sass-glob-importer'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'
import loadSettings from './lib/settings.js'
import path from 'path'
import rollup from 'rollup'
import rollupCommonjs from '@rollup/plugin-commonjs'
import rollupPostcss from 'rollup-plugin-postcss'
import rollupReplace from '@rollup/plugin-replace'
import rollupResolve from '@rollup/plugin-node-resolve'
import rollupRootImport from 'rollup-plugin-root-import';
import rollupTerser from 'rollup-plugin-terser'
import sass from 'node-sass'
import Task from './lib/task.js'

import tinylr from 'tiny-lr'
import VuePack from '@garage11/vuepack'
import yargs from 'yargs'

let settings


const tasks = {}

const cleanCSS = new CleanCSS({level: 2, returnPromise: true, sourceMap: true})
let vuePack

// Maps tasks to entrypoints.
const entrypoint = {
    html: 'index.html',
    js: 'molgenis.js',
    scss: 'scss/molgenis/molgenis.scss',
    vue: 'components/**/*.vue',
}

tasks.assets = new Task('assets', async function() {
    await imagemin([path.join(settings.dir.theme, settings.molgenis.theme.name, 'images', '*.{jpg,png,ico}')], {
        destination: path.join(settings.dir.build, 'images'),
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8],
            }),
        ],
    })

    await Promise.all([
        fs.copy(path.join(settings.dir.theme, settings.molgenis.theme.name, 'fonts'), path.join(settings.dir.build, 'fonts')),
    ])
})

tasks.build = new Task('build', async function() {
    await tasks.vue.start()
    await Promise.all([
        tasks.assets.start(),
        tasks.scss.start(entrypoint.scss),
        tasks.js.start(entrypoint.js),
        tasks.html.start(entrypoint.html),
    ])
})

tasks.html = new Task('html', async function() {
    if (!settings.optimized) {
        try {
            const importMap = JSON.parse((await fs.readFile(path.join(settings.dir.build, 'lib', 'import-map.json'))))
            for (let [reference, location] of Object.entries(importMap.imports)) {
                importMap.imports[reference] = `/${path.join('lib', location)}`
            }
            Object.assign(settings, {importMap})
        } catch (err) {
            this.log(`${this.prefix.error} import-map.json not found! did you run "yarn prepare"?`)
            return
        }

    }

    const indexFile = await fs.readFile(path.join(settings.dir.molgenis, 'index.html'))
    const compiled = _.template(indexFile)
    const html = compiled({settings})
    await fs.writeFile(path.join(settings.dir.build, 'index.html'), html)
})

tasks.js = new Task('js', async function(file) {
    if (!settings.optimized) {
        // Snowpack only requires a light-weight copy action to the build dir.
        let targets
        if (file) {
            await fs.copy(file, path.join(settings.dir.build, file.replace(settings.dir.base, '')))
        } else {
            targets = (await globby([
                path.join(settings.dir.base, settings.build.target, '**', '*.js'),
                `!${path.join(settings.dir.base, 'node_modules')}`,
            ]))

            targets.map((i) => fs.copy(i, path.join(settings.dir.build, i.replace(settings.dir.base, ''))))
            await Promise.all(targets)
        }

    } else {
        // Use rollup to generate an optimized bundle.
        let bundle
        try {
            bundle = await rollup.rollup({
                input: path.join(settings.dir.molgenis, this.ep.raw),
                plugins: [
                    rollupPostcss({plugins: []}),
                    rollupResolve({
                        preferBuiltins: true,
                        rootDir: path.join(settings.dir.molgenis),
                    }),
                    rollupCommonjs(),
                    rollupRootImport({
                        root: settings.dir.base,
                    }),
                    rollupTerser.terser(),

                    rollupReplace({'process.env.NODE_ENV': '"production"'}), // Needed for Vue esm build
                ],
            })
        } catch (err) {
            console.trace(err)
        }

        const target = path.join(settings.dir.build, 'molgenis', `${this.ep.filename}.js`)

        await bundle.write({
            file: target,
            format: 'iife',
            name: 'molgenis',
            sourcemap: true,
        })

        return ({size: (await fs.readFile(target)).length})
    }
})

tasks.scss = new Task('scss', async function() {
    let target = {
        css: path.join(settings.dir.build, `${this.ep.filename}.css`),
        map: path.join(settings.dir.build, `${this.ep.filename}.css.map`),
    }

    return new Promise((resolve, reject) => {
        sass.render({
            file: path.join(settings.dir.theme, settings.molgenis.theme.name, 'theme.scss'),
            importer: globImporter(),
            includePaths: [
                'node_modules',
                path.join(settings.dir.molgenis, 'scss'),
                path.join(settings.dir.molgenis, 'scss', 'molgenis'),
            ],
            outFile: target.css,
            sourceMap: !settings.optimized,
            sourceMapContents: true,
            sourceMapEmbed: false,
        }, async function(err, sassObj) {
            if (err) reject(err.formatted)

            let cssRules
            const promises = []

            if (settings.optimized) {
                cssRules = (await cleanCSS.minify(sassObj.css)).styles
            } else {
                cssRules = sassObj.css
                promises.push(fs.writeFile(target.map, sassObj.map))
            }

            promises.push(fs.writeFile(target.css, cssRules))
            await Promise.all(promises)

            resolve({size: cssRules.length})
        })
    })
})

tasks.vue = new Task('vue', async function() {
    const vueFiles = await globby([path.join(settings.dir.molgenis, 'components', '/**', '*.vue')])
    if (!vuePack) {
        vuePack = new VuePack({
            basePath: settings.dir.base,
            excludeTokens: ['molgenis', 'components'],
        })
    }

    const {components, templates} = await vuePack.compile(vueFiles, this.ep ? this.ep.raw : null)
    // This is an exceptional build target, because it is not
    // a module that is available from Node otherwise.
    await Promise.all([
        fs.writeFile(path.join(settings.dir.molgenis, 'components.js'), components),
        fs.writeFile(path.join(settings.dir.molgenis, 'templates.js'), templates),
        fs.writeFile(path.join(settings.dir.build, 'molgenis', 'components.js'), components),
        fs.writeFile(path.join(settings.dir.build, 'molgenis', 'templates.js'), templates),
    ])
})

tasks.watch = new Task('watch', async function() {
    await tasks.build.start()
    return new Promise((resolve) => {
        var app = connect()
        app.use(tinylr.middleware({app}))
        app.listen({host: settings.dev.host, port: settings.dev.port}, () => {
            this.log(`development server listening: ${chalk.grey(`${settings.dev.host}:${settings.dev.port}`)}`)
            resolve()
        })

        chokidar.watch([
            path.join('!', settings.dir.molgenis, 'templates.js'), // Templates are handled by the Vue task
            path.join(settings.dir.molgenis, '**', '*.js'),
        ]).on('change', async(file) => {
            await tasks.js.start(entrypoint.js, file)
            tinylr.changed('molgenis.js')
        })

        chokidar.watch(path.join(settings.dir.molgenis, '**', '*.vue')).on('change', async(file) => {
            await tasks.vue.start(file)
            tinylr.changed('templates.js')
        })

        chokidar.watch([
            path.join(settings.dir.molgenis, '**', '*.scss'),
            path.join(settings.dir.theme, '**', '*.scss'),
        ]).on('change', async() => {
            await tasks.scss.start(entrypoint.scss)
            tinylr.changed('molgenis.css')
        })

        chokidar.watch(path.join(settings.dir.molgenis, 'index.html')).on('change', async() => {
            await tasks.html.start(entrypoint.html)
            tinylr.changed('index.html')
        })

        chokidar.watch(path.join(settings.dir.theme, settings.molgenis.theme.name, '**', '*.{png,svg}')).on('change', () => {
            // Chokidar doesn't notice when the file save is completed.
            setTimeout(async() => {
                await tasks.assets.start()
                tinylr.changed('templates.js')
            }, 50)

        })
    })
})

;(async() => {
    settings = await loadSettings()
    const cli = {
        // eslint-disable-next-line no-console
        log(...args) {console.log(...args)},
        settings,
    }

    yargs
        .usage('Usage: $0 [task]')
        .detectLocale(false)
        .option('optimized', {alias: 'o', default: false, description: 'Optimized production mode', type: 'boolean'})
        .middleware(async(argv) => {
            if (!settings.version) {
                settings.version = JSON.parse((await fs.readFile(path.join(settings.dir[settings.build.target], 'package.json')))).version
            }

            // Make sure the required build directories exist.
            await fs.mkdirp(path.join(settings.dir.build, 'molgenis'))
            settings.optimized = argv.optimized
            if (settings.optimized) {
                tasks.watch.log(`build optimization: ${chalk.green('enabled')}`)
            } else {
                tasks.watch.log(`build optimization: ${chalk.red('disabled')}`)
            }
        })

        .command('assets', 'collect and optimize assets', () => {}, () => {tasks.assets.start()})
        .command('build', `build ${settings.build.target} package`, () => {}, () => {tasks.build.start()})
        .command('config', 'list build config', () => {}, () => buildInfo(cli))
        .command('html', 'generate index.html', () => {}, () => {tasks.html.start(entrypoint.html)})
        .command('js', `prepare ${settings.build.target} JavaScript`, () => {}, () => {tasks.js.start(entrypoint.js)})
        .command('scss', 'compile stylesheets (SCSS)', () => {}, () => {tasks.scss.start(entrypoint.scss)})
        .command('vue', 'compile Vue templates (ESM)', () => {}, () => {tasks.vue.start()})
        .command('watch', `${settings.build.target} development modus`, () => {}, () => {tasks.watch.start()})
        .demandCommand()
        .help('help')
        .showHelpOnFail(true)
        .argv
})()



