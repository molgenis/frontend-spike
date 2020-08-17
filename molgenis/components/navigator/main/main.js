// import _ from 'lodash'
import { mapGetters } from 'vuex'
import { SET_SHOW_HIDDEN_RESOURCES } from '/molgenis/store/mutations/navigator.js'
import store from '/molgenis/store/store.js'
import { FETCH_RESOURCES_BY_FOLDER, FETCH_RESOURCES_BY_QUERY } from '/molgenis/store/actions/navigator.js'


export default {
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
        // Show hidden resources (moved from molgenis.js)
        store.commit('navigator/' + SET_SHOW_HIDDEN_RESOURCES, true)
        if (this.query) {
            this.fetchResourcesByQuery()
        } else {
            this.fetchResourcesByPackage()
        }
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
}