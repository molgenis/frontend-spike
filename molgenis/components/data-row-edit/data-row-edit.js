import * as repository from '/molgenis/lib/repository/data-row.js'
import EntityToFormMapper from '/molgenis/lib/mappers/ui-form.js'
import FormComponent from '/molgenis/components/ui-form/form/form.js'

// import '../../node_modules/@molgenis/molgenis-ui-form/dist/static/css/molgenis-ui-form.css'

export default {
    components: {
        FormComponent,
    },
    created: function() {
        const mapperOptions = {
            booleanLabels: {
                falseLabel: this.$t('data-row-edit-boolean-false'),
                nillLabel: this.$t('data-row-edit-boolean-null'),
                trueLabel: this.$t('data-row-edit-boolean-true'),
            },
            mapperMode: this.dataRowId ? 'UPDATE' : 'CREATE',
            showNonVisibleAttributes: true,

        }
        repository.fetch(this.dataTableId, this.dataRowId).then(resp => {
            this.dataTableLabel = resp.meta.label
            const mappedData = EntityToFormMapper.generateForm(resp.meta, resp.rowData, mapperOptions)
            this.formFields = mappedData.formFields
            this.formData = mappedData.formData
            this.showForm = true
        }, this.handleError)
    },
    data() {
        return {
            alert: null,
            dataTableLabel: '',
            formData: {},
            formFields: [],
            formState: {},
            isSaving: false,
            showForm: false,
        }
    },
    methods: {
        clearAlert() {
            this.alert = null
        },
        goBackToPluginCaller() {
            window.history.go(-1)
        },
        handleError(message) {
            this.alert = {
                message: typeof message !== 'string' ? this.$t('data-row-edit-default-error-message')
                    : message,
                type: 'danger',
            }
            this.showForm = true
            this.isSaving = false
        },
        onSubmit() {
            const formState = this.formState
            this.formFields
                .filter(field => field.type !== 'field-group') // field-groups have no validation to show
                .forEach((field) => {
                    const fieldState = formState[field.id]
                    fieldState.$touched = true // trigger field to show validation result to user
                })
            if (this.formState.$valid) {
                this.isSaving = true
                repository
                    .save(this.formData, this.formFields, this.dataTableId, this.dataRowId)
                    .then(this.goBackToPluginCaller, this.handleError)
            }
        },
        onValueChanged(updatedFormData) {
            this.formData = updatedFormData
        },

    },
    props: {
        dataRowId: {
            default: null,
            required: false,
            type: String,
        },
        dataTableId: {
            required: true,
            type: String,
        },
    },
}