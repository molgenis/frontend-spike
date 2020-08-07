import _ from 'lodash'
import { mapGetters } from 'vuex'
import { FETCH_RESOURCES_BY_FOLDER, FETCH_RESOURCES_BY_QUERY } from '@/store/actions/navigator'
import Alerts from './Alerts'
import Jobs from './Jobs'
import NavigatorSearch from './NavigatorSearch'
import NavigatorBreadcrumb from './NavigatorBreadcrumb'
import NavigatorActions from './NavigatorActions'
import NavigatorTable from './NavigatorTable'

export default {
    name: 'Navigator',
    components: {Alerts, Jobs, NavigatorSearch, NavigatorBreadcrumb, NavigatorActions, NavigatorTable},
    computed: {
        ...mapGetters('navigator', ['query', 'folderId']),
    },
    watch: {
        '$route'(to, from) {
            if (to.query && (to.query.q !== from.query.q)) {
                if (to.query.q) {
                    _.debounce(this.fetchResourcesByQuery, 100)()
                } else {
                    this.fetchResourcesByPackage()
                }
            } else if (to.params.folderId !== from.params.folderId) {
                this.fetchResourcesByPackage()
            }
        },
    },
    mounted: function() {
        if (this.query) {
            this.fetchResourcesByQuery()
        } else {
            this.fetchResourcesByPackage()
        }
    },
    methods: {
        fetchResourcesByQuery: function() {
            this.$store.dispatch('navigator/' + FETCH_RESOURCES_BY_QUERY, this.query)
        },
        fetchResourcesByPackage: function() {
            this.$store.dispatch('navigator/' + FETCH_RESOURCES_BY_FOLDER, this.folderId)
        },
    },
}