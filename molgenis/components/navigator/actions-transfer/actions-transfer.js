import { DOWNLOAD_SELECTED_RESOURCES } from '@molgenis/molgenis/store/actions/navigator.js'
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapState('navigator', ['folder']),
        ...mapGetters('navigator', ['nrSelectedResources', 'query']),
        canDownload() {
            return this.nrSelectedResources > 0
        },
        canUpload() {
            return this.importWizardUrl && !this.query
        },
    },
    data() {
        return {
            importWizardUrl: window.__INITIAL_STATE__.pluginUrls['importwizard'],
        }
    },
    methods: {
        downloadSelectedResources: function() {
            this.$store.dispatch('navigator/' + DOWNLOAD_SELECTED_RESOURCES)
        },
    },
    name: 'NavigatorActionsTransfer',
}