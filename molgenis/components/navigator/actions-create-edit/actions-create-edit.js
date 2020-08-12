import { DOWNLOAD_SELECTED_RESOURCES } from '/molgenis/store/actions/navigator.js'
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapGetters('navigator', ['nrSelectedResources', 'query']),
        ...mapState('navigator', ['folder', 'selectedResources']),
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
        getSelectedResourceType() {
            return this.selectedResources[0].type
        },
    },
    methods: {
        downloadSelectedResources: function() {
            this.$store.dispatch('navigator/' + DOWNLOAD_SELECTED_RESOURCES)
        },
    },
    name: 'NavigatorActionsCreateEdit',
}