import { mapState } from 'vuex'
import { UPDATE_RESOURCE } from '/molgenis/store/actions/navigator.js'

export default {
    computed: {
        ...mapState('navigator', ['resources', 'selectedResources']),
        selectedResource() {
            var selectedResourceId = this.selectedResources[0].id
            return this.resources.find(resource => resource.id === selectedResourceId)
        },
    },
    data() {
        return {
            form: {
                description: '',
                label: '',
            },
            validated: false,
        }
    },
    methods: {
        handleOk(evt) {
            evt.preventDefault()
            if (!this.form.label) {
                this.validated = true
            } else {
                this.handleSubmit()
            }
        },
        handleSubmit() {
            var updatedResource = Object.assign({}, this.selectedResource, {
                description: this.form.description,
                label: this.form.label,
            })
            this.$store.dispatch('navigator/' + UPDATE_RESOURCE, updatedResource)
            this.$refs.packageUpdateModal.hide()
        },
        resetForm() {
            this.form = {
                description: this.selectedResource.description,
                label: this.selectedResource.label,
            }
            this.validated = false
            this.$refs.updatePackageLabelInput.$el.focus()
        },
    },
    name: 'NavigatorModalPackageUpdate',
}