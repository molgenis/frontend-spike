import _ from 'lodash'
import Alerts from './Alerts'
import Jobs from './Jobs'
import { mapGetters } from 'vuex'
import NavigatorActions from './NavigatorActions'
import NavigatorBreadcrumb from './NavigatorBreadcrumb'
import NavigatorSearch from './NavigatorSearch'
import NavigatorTable from './NavigatorTable'
import { FETCH_RESOURCES_BY_FOLDER, FETCH_RESOURCES_BY_QUERY } from '@molgenis/molgenis/store/actions/navigator.js'


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