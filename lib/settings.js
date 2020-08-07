import {__dirname} from './utils.js'
import fs from 'fs-extra'
import path from 'path'
import rc from 'rc'
import themeSettings from '@molgenis/theme-default'


export default async () => {
    const base = path.resolve(path.join(__dirname, '../'))
    const molgenisDir = path.resolve(path.join(base, 'molgenis'))

    const defaults = JSON.parse(await fs.readFile(path.join(molgenisDir, '.molgenisrc.defaults'), 'utf8'))
    const settings = {
        build: {
            // Reserves space for multiple build projects.
            target: 'molgenis',
            targets: ['molgenis'],
        },
        dev: {host: '127.0.0.1', port: 35729},
        dir: {
            base,
            build: path.join(base, 'build'),
            node: path.resolve(path.join(base, 'node_modules')),
            theme: path.resolve(path.join(base, 'theme')),
            tmp: path.join(base, 'build', '.tmp'),
        },
        molgenis: rc('molgenis', defaults)
    }
    settings.dir.screens = path.resolve(path.join(settings.dir.build, 'screens'))

    settings.molgenis.theme = themeSettings

    return settings
}