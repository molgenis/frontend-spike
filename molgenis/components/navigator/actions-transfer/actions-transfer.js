import { DOWNLOAD_SELECTED_RESOURCES } from '@/store/actions/navigator'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'NavigatorActionsTransfer',
    data() {
        return {
            importWizardUrl: window.__INITIAL_STATE__.pluginUrls['importwizard'],
        }
    },
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
    methods: {
        downloadSelectedResources: function() {
            this.$store.dispatch('navigator/' + DOWNLOAD_SELECTED_RESOURCES)
        },
    },
}