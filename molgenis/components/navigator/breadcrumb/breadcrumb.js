import { mapGetters } from 'vuex'

export default {
    name: 'NavigatorBreadcrumb',
    computed: {
        ...mapGetters('navigator', ['folderPath', 'query']),
    },
}