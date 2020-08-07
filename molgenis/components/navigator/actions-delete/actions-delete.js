import { DOWNLOAD_SELECTED_RESOURCES } from '@molgenis/molgenis/store/actions/navigator.js'
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapGetters('navigator', ['nrSelectedResources']),
        ...mapState('navigator', ['folder']),
        canDelete() {
            return this.nrSelectedResources > 0 && !(this.folder && this.folder.readonly)
        },
        getSelectedResourceType() {
            return this.selectedResources[0].type
        },
    },
    methods: {
        downloadSelectedResources: function() {
            this.$store.dispatch('navigator/' + DOWNLOAD_SELECTED_RESOURCES)
        },
    },
    name: 'NavigatorActionsTransfer',
}