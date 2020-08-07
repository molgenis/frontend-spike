import { DOWNLOAD_SELECTED_RESOURCES } from '@/store/actions/navigator'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'NavigatorActionsTransfer',
    computed: {
        ...mapGetters('navigator', ['nrSelectedResources']),
        ...mapState('navigator', ['folder']),
        getSelectedResourceType() {
            return this.selectedResources[0].type
        },
        canDelete() {
            return this.nrSelectedResources > 0 && !(this.folder && this.folder.readonly)
        },
    },
    methods: {
        downloadSelectedResources: function() {
            this.$store.dispatch('navigator/' + DOWNLOAD_SELECTED_RESOURCES)
        },
    },
}