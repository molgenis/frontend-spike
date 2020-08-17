import { GET_ATTRIBUTE_TYPES, GET_EDITOR_ENTITY_TYPE, GET_ENTITY_TYPES, GET_PACKAGES } from '/molgenis/store/actions/metadata.js'
import { mapGetters, mapState } from 'vuex'
import { SET_SELECTED_ATTRIBUTE_ID, SET_SELECTED_ENTITY_TYPE_ID } from '/molgenis/store/mutations/metadata.js'

export default {
    computed: {
        ...mapState(['alert', 'editorEntityType', 'loading']),
        ...mapGetters({
            selectedAttribute: 'getSelectedAttribute',
            selectedEntityType: 'getSelectedEntityType',
        }),
    },
    watch: {
        '$route'(to, from) {
            const fromEntityTypeId = from.params.entityTypeId
            const toEntityTypeId = to.params.entityTypeId

            // The route change changed the EntityType we are looking at
            if (toEntityTypeId && fromEntityTypeId !== toEntityTypeId) {
                this.$store.dispatch(GET_EDITOR_ENTITY_TYPE, toEntityTypeId)
            }
        },
        alert(alert) {
            if (alert.message !== null) {
                this.$toaster.add(alert.message, { theme: 'v-toast-' + alert.type })
            }
        },
        created: function() {
            const entityTypeId = this.$route.params.entityTypeId
            const attributeId = this.$route.params.attributeId

            if (entityTypeId) {
                this.$store.commit(SET_SELECTED_ENTITY_TYPE_ID, entityTypeId)
                this.$store.dispatch(GET_EDITOR_ENTITY_TYPE, entityTypeId)
            }
            if (attributeId) this.$store.commit(SET_SELECTED_ATTRIBUTE_ID, attributeId)

            this.$store.dispatch(GET_ENTITY_TYPES)
            this.$store.dispatch(GET_PACKAGES)
            this.$store.dispatch(GET_ATTRIBUTE_TYPES)
        },
        selectedAttribute(selectedAttribute) {
            if (selectedAttribute && this.$store.state.selectedEntityTypeId) {
                if (!selectedAttribute.isNew) this.$router.push('/' + this.$store.state.selectedEntityTypeId + '/' + selectedAttribute.id)
            }
        },
        selectedEntityType(selectedEntityType) {
            if (selectedEntityType) {
                if (!selectedEntityType.isNew) this.$router.push('/' + selectedEntityType.id)
            } else {
                this.$router.push('/')
            }
        },
    },
}