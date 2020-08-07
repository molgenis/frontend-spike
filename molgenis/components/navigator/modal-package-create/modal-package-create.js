import { mapGetters } from 'vuex'
import { CREATE_RESOURCE } from '@/store/actions/navigator'

export default {
    name: 'NavigatorModalPackageCreate',
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
        ...mapGetters('navigator', ['folderId']),
    },
    methods: {
        resetForm() {
            this.form = {
                label: '',
                description: '',
            }
            this.validated = false
            this.$refs.createPackageLabelInput.$el.focus()
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
            var folder = Object.assign({}, this.form, {type: 'PACKAGE', readonly: false})
            this.$store.dispatch('navigator/' + CREATE_RESOURCE, folder)
            this.$refs.packageCreateModal.hide()
        },
    },
}