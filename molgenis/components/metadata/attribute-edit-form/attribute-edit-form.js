import {CREATE_ATTRIBUTE} from '/molgenis/store/actions/metadata.js'
import {getConfirmBeforeDeletingProperties} from '/molgenis/store/getters/metadata.js'
// import Multiselect from 'vue-multiselect'
import {
    DELETE_SELECTED_ATTRIBUTE,
    SET_SELECTED_ATTRIBUTE_ID,
    UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
    UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER,
} from '/molgenis/store/mutations/metadata.js'
import {mapGetters, mapState} from 'vuex'


export default {
    components: {
        // Multiselect,
    },
    computed: {
        ...mapState(['languageCodes', 'editorEntityType', 'attributeTypes', 'entityTypes']),
        ...mapGetters({
            attributeTree: 'getAttributeTree',
            compoundAttributes: 'getCompoundAttributes',
            editorEntityTypeAttributes: 'getEditorEntityTypeAttributes',
            mappedByAttributes: 'getMappedByAttributes',
            selectedAttribute: 'getSelectedAttribute',
            selectedAttributeIndex: 'getIndexOfSelectedAttribute',
        }),
        aggregatable: {
            get() {
                return this.selectedAttribute.aggregatable
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'aggregatable', value: value})
            },
        },
        auto: {
            get() {
                return this.selectedAttribute.auto
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'auto', value: value})
            },
        },
        cascadeDelete: {
            get() {
                return this.selectedAttribute.cascadeDelete
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'cascadeDelete', value: value})
            },
        },
        defaultValue: {
            get() {
                return this.selectedAttribute.defaultValue
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'defaultValue', value: value})
            },
        },
        description: {
            get() {
                return this.selectedAttribute.description
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'description', value: value})
            },
        },
        descriptionI18n: function() {
            return this.selectedAttribute.descriptionI18n
        },
        enumOptions: {
            get() {
                return this.selectedAttribute.enumOptions.join(',')
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'enumOptions', value: value.split(',')})
            },
        },
        expression: {
            get() {
                return this.selectedAttribute.expression
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'expression', value: value})
            },
        },
        isEnumType: function() {
            return this.selectedAttribute.type === 'enum'
        },
        isNumericType: function() {
            return ['int', 'long'].includes(this.selectedAttribute.type)
        },
        isOneToManyType: function() {
            return this.selectedAttribute.type === 'onetomany'
        },
        isReferenceType: function() {
            return ['file', 'xref', 'mref', 'categorical', 'categoricalmref', 'onetomany'].includes(
                this.selectedAttribute.type)
        },
        label: {
            get() {
                return this.selectedAttribute.label
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'label', value: value})
            },
        },
        labelI18n: function() {
            return this.selectedAttribute.labelI18n
        },
        mappedByAttribute: {
            get() {
                return this.selectedAttribute.mappedByAttribute
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'mappedByAttribute', value: value})
            },
        },
        name: {
            get() {
                return this.selectedAttribute.name
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'name', value: value})
            },
        },
        nullable: {
            get() {
                return this.selectedAttribute.nullable
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'nullable', value: value})
            },
        },
        nullableExpression: {
            get() {
                return this.selectedAttribute.nullableExpression
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'nullableExpression', value: value})
            },
        },
        orderBy: {
            get() {
                return this.selectedAttribute.orderBy
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'orderBy', value: value})
            },
        },
        parent: {
            get() {
                return this.selectedAttribute.parent
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'parent', value: value})
            },
        },
        rangeMax: {
            get() {
                return this.selectedAttribute.rangeMax
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'rangeMax', value: value})
            },
        },
        rangeMin: {
            get() {
                return this.selectedAttribute.rangeMin
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'rangeMin', value: value})
            },
        },
        readonly: {
            get() {
                return this.selectedAttribute.readonly
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'readonly', value: value})
            },
        },
        refEntityType: {
            get() {
                return this.selectedAttribute.refEntityType
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'refEntityType', value: value})
            },
        },
        type: {
            get() {
                return this.selectedAttribute.type
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'type', value: value})
            },
        },
        unique: {
            get() {
                return this.selectedAttribute.unique
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'unique', value: value})
            },
        },
        validationExpression: {
            get() {
                return this.selectedAttribute.validationExpression
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'validationExpression', value: value})
            },
        },
        visible: {
            get() {
                return this.selectedAttribute.visible
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'visible', value: value})
            },
        },
        visibleExpression: {
            get() {
                return this.selectedAttribute.visibleExpression
            },
            set(value) {
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE,
                    {key: 'visibleExpression', value: value})
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
        addAttribute() {
            this.$store.dispatch(CREATE_ATTRIBUTE)
        },
        customOneToManyLabel(attr) {
            return `${attr.entity.label} - ${attr.label}`
        },
        deleteAttribute(selectedAttribute) {
            this.$swal(getConfirmBeforeDeletingProperties(selectedAttribute.label, this.$t)).then(
                () => {
                    this.$store.commit(DELETE_SELECTED_ATTRIBUTE, selectedAttribute.id)
                }).catch(this.$swal.noop)
        },
        moveAttribute(moveOrder) {
            this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER, {
                moveOrder: moveOrder,
                selectedAttributeIndex: this.selectedAttributeIndex,
            })
        },
        onAttributeSelect(selectedAttribute) {
            this.$store.commit(SET_SELECTED_ATTRIBUTE_ID, selectedAttribute.id)
        },
        updateDescriptionI18n(languageCode, value) {
            var descriptionI18n = Object.assign({}, this.selectedAttribute.descriptionI18n)
            descriptionI18n[languageCode] = value
            this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'descriptionI18n', value: descriptionI18n})
        },
        updateLabelI18n(languageCode, value) {
            var labelI18n = Object.assign({}, this.selectedAttribute.labelI18n)
            labelI18n[languageCode] = value
            this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE, {key: 'labelI18n', value: labelI18n})
        },
    },
}