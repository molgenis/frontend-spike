import { mapGetters, mapState } from 'vuex'
import { COPY_CLIPBOARD_RESOURCES, MOVE_CLIPBOARD_RESOURCES } from '@/store/actions/navigator'
import { SET_CLIPBOARD } from '@/store/mutations/navigator'

export default {
    name: 'NavigatorActionsClipboard',
    computed: {
        ...mapGetters('navigator', ['nrSelectedResources', 'folderId', 'query', 'nrClipboardResources']),
        ...mapState('navigator', ['clipboard', 'folder', 'selectedResources']),
        canCut() {
            return this.nrSelectedResources > 0 && !(this.folder && this.folder.readonly)
        },
        canCopy() {
            return this.nrSelectedResources > 0
        },
        canPaste() {
            return !this.query && this.nrClipboardResources > 0 && !(this.folder && this.folder.readonly)
        },
    },
    methods: {
        selectClipboardResources: function(mode) {
            this.$emit('bv::disable::tooltip')
            const clipboard = {
                mode: mode,
                resources: this.selectedResources.slice(),
            }
            this.$store.commit('navigator/' + SET_CLIPBOARD, clipboard)
        },
        pasteClipboardResources: function() {
            const action = this.clipboard.mode === 'CUT' ? MOVE_CLIPBOARD_RESOURCES : COPY_CLIPBOARD_RESOURCES
            this.$store.dispatch('navigator/' + action, this.folder)
        },
    },
}