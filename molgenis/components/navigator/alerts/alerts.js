import { mapState } from 'vuex'
import { REMOVE_ALERT } from '/molgenis/store/mutations/navigator.js'

export default {
    computed: {
        ...mapState('navigator', ['alerts']),
    },
    methods: {
        getVariant: function(alert) {
            let variant
            switch (alert.type) {
            case 'INFO':
                variant = 'info'
                break
            case 'SUCCESS':
                variant = 'success'
                break
            case 'WARNING':
                variant = 'warning'
                break
            case 'ERROR':
                variant = 'danger'
                break
            default:
                throw new Error('unexpected alert type ' + alert.type)
            }
            return variant
        },
        removeAlert: function(index) {
            this.$store.commit('navigator/' + REMOVE_ALERT, index)
        },
    },
    name: 'Alerts',
}