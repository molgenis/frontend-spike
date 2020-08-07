import { UPDATE_RESOURCE } from '@/store/actions/navigator'
import { mapState } from 'vuex'

export default {
    name: 'NavigatorModalPackageUpdate',
    data() {
        return {
            form: {
                label: '',
                description: '',
            },
            validated: false,
        }
    },
    computed: {
        ...mapState('navigator', ['resources', 'selectedResources']),
        selectedResource() {
            var selectedResourceId = this.selectedResources[0].id
            return this.resources.find(resource => resource.id === selectedResourceId)
        },
    },
    methods: {
        resetForm() {
            this.form = {label: this.selectedResource.label, description: this.selectedResource.description}
            this.validated = false
            this.$refs.updatePackageLabelInput.$el.focus()
        },
        handleOk(evt) {
            evt.preventDefault()
            if (!this.form.label) {
                this.validated = true
            } else {
                this.handleSubmit()
            }
        },
        handleSubmit() {
            var updatedResource = Object.assign({}, this.selectedResource,
                {label: this.form.label, description: this.form.description})
            this.$store.dispatch('navigator/' + UPDATE_RESOURCE, updatedResource)
            this.$refs.packageUpdateModal.hide()
        },
    },
}