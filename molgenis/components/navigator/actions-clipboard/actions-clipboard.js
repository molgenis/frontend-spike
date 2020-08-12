import { SET_CLIPBOARD } from '/molgenis/store/mutations/navigator.js'
import { COPY_CLIPBOARD_RESOURCES, MOVE_CLIPBOARD_RESOURCES } from '/molgenis/store/actions/navigator.js'
import { mapGetters, mapState } from 'vuex'


export default {

    computed: {
        ...mapGetters('navigator', ['nrSelectedResources', 'folderId', 'query', 'nrClipboardResources']),
        ...mapState('navigator', ['clipboard', 'folder', 'selectedResources']),
        canCopy() {
            return this.nrSelectedResources > 0
        },
        canCut() {
            return this.nrSelectedResources > 0 && !(this.folder && this.folder.readonly)
        },
        canPaste() {
            return !this.query && this.nrClipboardResources > 0 && !(this.folder && this.folder.readonly)
        },
    },
    methods: {
        pasteClipboardResources: function() {
            const action = this.clipboard.mode === 'CUT' ? MOVE_CLIPBOARD_RESOURCES : COPY_CLIPBOARD_RESOURCES
            this.$store.dispatch('navigator/' + action, this.folder)
        },
        selectClipboardResources: function(mode) {
            this.$emit('bv::disable::tooltip')
            const clipboard = {
                mode: mode,
                resources: this.selectedResources.slice(),
            }
            this.$store.commit('navigator/' + SET_CLIPBOARD, clipboard)
        },
    },
    name: 'NavigatorActionsClipboard',
}