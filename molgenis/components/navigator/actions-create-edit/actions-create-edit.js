import { DOWNLOAD_SELECTED_RESOURCES } from '@/store/actions/navigator'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'NavigatorActionsCreateEdit',
    data() {
        return {
            metadataManagerUrl: window.__INITIAL_STATE__.pluginUrls['metadata-manager'],
        }
    },
    computed: {
        ...mapGetters('navigator', ['nrSelectedResources', 'query']),
        ...mapState('navigator', ['folder', 'selectedResources']),
        getSelectedResourceType() {
            return this.selectedResources[0].type
        },
        canCreate() {
            return !(this.query || (this.folder && this.folder.readonly))
        },
        canEdit() {
            let canEdit = this.nrSelectedResources === 1 && !(this.query || this.selectedResources[0].readonly)
            if (canEdit) {
                switch (this.getSelectedResourceType) {
                case 'PACKAGE':
                    break
                case 'ENTITY_TYPE':
                case 'ENTITY_TYPE_ABSTRACT':
                    canEdit &= this.metadataManagerUrl !== undefined
                    break
                }
            }
            return canEdit
        },
    },
    methods: {
        downloadSelectedResources: function() {
            this.$store.dispatch('navigator/' + DOWNLOAD_SELECTED_RESOURCES)
        },
    },
}