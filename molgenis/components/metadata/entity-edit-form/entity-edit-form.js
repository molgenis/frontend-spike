import { getConfirmBeforeDeletingProperties } from '/molgenis/store/getters/metadata.js'
import Multiselect from 'vue-multiselect'
import { UPDATE_EDITOR_ENTITY_TYPE } from '/molgenis/store/mutations/metadata.js'
import { DELETE_ENTITY_TYPE, RESET_EDITOR_ENTITY_TYPE, SAVE_EDITOR_ENTITY_TYPE } from '/molgenis/store/actions/metadata.js'
import { mapGetters, mapState } from 'vuex'


export default {
    components: {
        Multiselect,
    },
    computed: {
        ...mapState(['languageCodes', 'editorEntityType', 'packages', 'selectedEntityTypeId']),
        ...mapGetters({
            abstractEntities: 'getAbstractEntities',
            attributes: 'getEditorEntityTypeAttributes',
            isEntityTypeEdited: 'getEditorEntityTypeHasBeenEdited',
        }),
        abstract0: {
            get() {
                return this.$store.state.editorEntityType.abstract0
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'abstract0', value: value})
            },
        },
        description: {
            get() {
                return this.$store.state.editorEntityType.description
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'description', value: value})
            },
        },
        descriptionI18n: function() {
            return this.$store.state.editorEntityType.descriptionI18n
        },
        entityTypeParent: {
            get() {
                return this.$store.state.editorEntityType.entityTypeParent
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'entityTypeParent', value: value})
            },
        },
        idAttribute: {
            get() {
                return this.$store.state.editorEntityType.idAttribute
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'idAttribute', value: value})
            },
        },
        label: {
            get() {
                return this.$store.state.editorEntityType.label
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'label', value: value})
            },
        },
        labelAttribute: {
            get() {
                return this.$store.state.editorEntityType.labelAttribute
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'labelAttribute', value: value})
            },
        },
        labelI18n: function() {
            return this.$store.state.editorEntityType.labelI18n
        },
        lookupAttributes: {
            get() {
                return this.$store.state.editorEntityType.lookupAttributes
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'lookupAttributes', value: value})
            },
        },
        package0: {
            get() {
                return this.$store.state.editorEntityType.package0
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'package0', value: value})
            },
        },
    },
    data: function() {
        return {
            showDescriptionLanguageInputs: false,
            showLabelLanguageInputs: false,
        }
    },
    methods: {
        deleteEntityType(selectedEntityTypeId) {
            this.$swal(getConfirmBeforeDeletingProperties(selectedEntityTypeId, this.$t)).then(() => {
                this.$store.dispatch(DELETE_ENTITY_TYPE, selectedEntityTypeId)
            }).catch(this.$swal.noop)
        },
        resetEntityType() {
            this.$store.dispatch(RESET_EDITOR_ENTITY_TYPE)
        },
        saveEntityType() {
            this.$store.dispatch(SAVE_EDITOR_ENTITY_TYPE, this.$t)
        },
        updateDescriptionI18n(languageCode, value) {
            var descriptionI18n = Object.assign({}, this.$store.state.editorEntityType.descriptionI18n)
            descriptionI18n[languageCode] = value
            this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE,
                {key: 'descriptionI18n', value: descriptionI18n})
        },
        updateLabelI18n(languageCode, value) {
            var labelI18n = Object.assign({}, this.$store.state.editorEntityType.labelI18n)
            labelI18n[languageCode] = value
            this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, {key: 'labelI18n', value: labelI18n})
        },
    },
}