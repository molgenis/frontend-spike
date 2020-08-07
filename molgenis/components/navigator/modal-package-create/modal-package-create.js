import { CREATE_RESOURCE } from '@molgenis/molgenis/store/actions/navigator.js'
import { mapGetters } from 'vuex'


export default {
    computed: {
        ...mapGetters('navigator', ['folderId']),
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
            var folder = Object.assign({}, this.form, {
                readonly: false,
                type: 'PACKAGE',
            })
            this.$store.dispatch('navigator/' + CREATE_RESOURCE, folder)
            this.$refs.packageCreateModal.hide()
        },
        resetForm() {
            this.form = {
                description: '',
                label: '',
            }
            this.validated = false
            this.$refs.createPackageLabelInput.$el.focus()
        },
    },
    name: 'NavigatorModalPackageCreate',
}