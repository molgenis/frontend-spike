import { faCog } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faCog)

const SETTINGS_APP_URL = '/plugin/data-row-edit'

export default {
    computed: {
        href() {
            const href = `${SETTINGS_APP_URL}/${this.settingsTableId}`
            return this.settingsRowId ? `${href}/${this.settingsRowId}` : href
        },
    },
    name: 'TableSettingsButton',
    props: {
        settingsRowId: {
            required: false,
            type: String,
        },
        settingsTableId: {
            required: true,
            type: String,
        },
    },
}