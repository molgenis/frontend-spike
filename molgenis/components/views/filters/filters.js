import { createBookmark } from '/molgenis/lib/mappers/bookmark.js'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import FilterContainer from '/molgenis/components/filter/filter-container/filter-container.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { mapMutations, mapState } from 'vuex'


library.add(faChevronLeft)

export default {
    components: { FilterContainer, FontAwesomeIcon },
    computed: {
        ...mapState('explorer', [
            'filters',
            'tableMeta',
            'bookmarkedShownFilters',
            'bookmarkedSelections',
            'componentRoute',
        ]),
        filterSelections: {
            get() {
                return this.filters.selections
            },
            set(val) {
                this.setFilterSelection(val)
                this.addBookmark()
            },
        },
        filterShown: {
            get() {
                return this.filters.shown
            },
            set(val) {
                this.setFiltersShown(val)
                this.addBookmark()
            },
        },
        isFilterDataLoaded() {
            return this.tableMeta !== null
        },
    },
    data: () => {
        return {
            renderCount: 0,
        }
    },
    methods: {
        ...mapMutations('explorer', [
            'setHideFilters',
            'applyBookmark',
            'setFiltersShown',
            'setFilterSelection',
            'setComponentRoute',
        ]),
        addBookmark() {
            createBookmark(this.$router)
        },
        refreshFilterView() {
            // Refresh the filtercomponent
            this.renderCount++
        },
        updateState(shownFilters) {
            this.setFiltersShown(shownFilters)
            this.addBookmark()
        },
    },
    name: 'FiltersView',
    watch: {
        '$route.query': function(query) {
            // need to check if component triggered query, if so ignore.
            if (!this.componentRoute) {
                this.applyBookmark(query.bookmark)
                this.refreshFilterView()
            } else this.setComponentRoute(false)
        },
    },
}