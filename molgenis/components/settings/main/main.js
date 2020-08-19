import api from '/molgenis/lib/api.js'
import EntityToFormMapper from '/molgenis/lib/mappers/ui-form.js'

export default {
    created: async function() {
        this.selectedSetting = this.$route.params.setting
        console.log("SELECTED SETTING", this.$route.params)
        try {
            const response = await api.get('/api/v2/sys_md_EntityType?sort=label&num=1000&&q=isAbstract==false;package.id==sys_set')
            this.settingsOptions = response.items
            console.log(response)
        } catch(err) {
            this.handleError(err)
        }
    },
    data() {
        return {
            alert: null,
            formData: {},
            formFields: [],
            formState: {},
            isSaving: false,
            selectedSetting: null,
            settingLabel: '',
            settingsOptions: [],
            showForm: false,
        }
    },
    methods: {
        clearAlert() {
            this.alert = null
        },
        handleError(message) {
            this.isSaving = false
            this.alert = {
                message: typeof message !== 'string' ? 'An error has occurred.' : message,
                type: 'danger',
            }
        },
        handleSuccess() {
            this.formState._reset()
            this.alert = {
                message: 'Settings saved',
                type: 'success',
            }
            this.isSaving = false
        },
        initializeForm(response) {
            const mappedData = EntityToFormMapper.generateForm(response.meta, response.items[0])
            this.formFields = mappedData.formFields
            this.formData = mappedData.formData
            this.settingLabel = response.meta.label
            this.showForm = true
        },
        initializeSettingsOptions(response) {
            this.settingsOptions = response.items
        },
        onSubmit() {
            this.isSaving = true
            const options = {
                body: JSON.stringify(this.formData),
            }
            const uri = '/api/v1/' + this.selectedSetting + '/' + this.formData.id + '?_method=PUT'
            api.post(uri, options).then(this.handleSuccess, this.handleError)
        },
        onValueChanged(formData) {
            this.formData = formData
        },
    },
    watch: {
        selectedSetting: function(setting) {
            console.log("SETTING")
            this.showForm = false
            api.get('/api/v2/' + setting).then(this.initializeForm, this.handleError)
        },
    },
}

