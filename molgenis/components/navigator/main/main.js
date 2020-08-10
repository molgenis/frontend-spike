import _ from 'lodash'
import Alerts from '../alerts/alerts.js'
import Jobs from '../jobs/jobs.js'
import { mapGetters } from 'vuex'
import NavigatorActions from '../actions/actions.js'
import NavigatorBreadcrumb from '../breadcrumb/breadcrumb.js'
import NavigatorSearch from '../search/search.js'
import NavigatorTable from '../table/table.js'
import { FETCH_RESOURCES_BY_FOLDER, FETCH_RESOURCES_BY_QUERY } from '/molgenis/store/actions/navigator.js'


export default {
    components: {
        Alerts,
        Jobs,
        NavigatorActions,
        NavigatorBreadcrumb,
        NavigatorSearch,
        NavigatorTable,
    },
    computed: {
        ...mapGetters('navigator', ['query', 'folderId']),
    },
    methods: {
        fetchResourcesByPackage: function() {
            this.$store.dispatch('navigator/' + FETCH_RESOURCES_BY_FOLDER, this.folderId)
        },
        fetchResourcesByQuery: function() {
            this.$store.dispatch('navigator/' + FETCH_RESOURCES_BY_QUERY, this.query)
        },
    },
    mounted: function() {
        if (this.query) {
            this.fetchResourcesByQuery()
        } else {
            this.fetchResourcesByPackage()
        }
    },
    name: 'Navigator',
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
}