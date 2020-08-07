import { createBookmark } from '@molgenis/molgenis/mappers/bookmark.js'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faSearch)

export default {

    components: { FontAwesomeIcon },
    data() {
        return {
            searchText: this.value,
        }
    },
    methods: {
        handleSearchAction() {
            this.$emit('input', this.searchText)
            createBookmark(this.$router)
        },
    },
    name: 'SearchComponent',
    props: {
        value: {
            required: false,
            type: String,
        },
    },
    watch: {
        searchText: {
        // Add handler to support html5 clear search action
            handler: function(val) {
                if (val === '') {
                    this.handleSearchAction()
                }
            },
            immediate: true,
        },
        value: {
            handler: function(val) {
                if (val === '') {
                    this.searchText = ''
                }
            },
            immediate: true,
        },

    },
}