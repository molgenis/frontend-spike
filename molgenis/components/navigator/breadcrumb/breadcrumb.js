import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('navigator', ['folderPath', 'query']),
    },
    name: 'NavigatorBreadcrumb',
}