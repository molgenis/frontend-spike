import { CREATE_ENTITY_TYPE } from '/molgenis/store/actions/metadata.js'
import { getConfirmBeforeLeavingProperties } from '/molgenis/store/getters/metadata.js'
import Multiselect from 'vue-multiselect'
import { SET_SELECTED_ENTITY_TYPE_ID } from '/molgenis/store/mutations/metadata.js'
import { mapGetters, mapState } from 'vuex'


export default {
    components: {
        Multiselect,
    },
    computed: {
        ...mapState('metadata', ['entityTypes']),
        ...mapGetters('metadata', {
            isEntityTypeEdited: 'getEditorEntityTypeHasBeenEdited',
        }),
        selectedEntityType: {
            get() {
                return this.$store.getters.getSelectedEntityType
            },
            set(selectedEntityType) {
                if (!this.isEntityTypeEdited) this.$store.commit(SET_SELECTED_ENTITY_TYPE_ID, selectedEntityType.id)
                else {
                    this.$swal(getConfirmBeforeLeavingProperties(this.$t)).then(() => {
                        this.$store.commit(SET_SELECTED_ENTITY_TYPE_ID, selectedEntityType.id)
                    }).catch(this.$swal.noop)
                }
            },
        },
    },
    methods: {
        createNewEntityType() {
            if (this.isEntityTypeEdited) {
                this.$swal(getConfirmBeforeLeavingProperties(this.$t)).then(() => {
                    this.$store.dispatch(CREATE_ENTITY_TYPE)
                }).catch(this.$swal.noop)
            } else {
                this.$store.dispatch(CREATE_ENTITY_TYPE)
            }
        },
    },
}