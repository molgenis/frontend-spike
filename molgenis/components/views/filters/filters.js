import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FilterContainer from '@/components/filter/FilterContainer.vue'
import { createBookmark } from '../mappers/bookmarkMapper'

library.add(faChevronLeft)

export default Vue.extend({
    name: 'FiltersView',
    components: { FilterContainer, FontAwesomeIcon },
    data: () => {
        return {
            renderCount: 0,
        }
    },
    computed: {
        ...mapState('explorer', [
            'filters',
            'tableMeta',
            'bookmarkedShownFilters',
            'bookmarkedSelections',
            'componentRoute',
        ]),
        isFilterDataLoaded() {
            return this.tableMeta !== null
        },
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
    },
    methods: {
        ...mapMutations('explorer', [
            'setHideFilters',
            'applyBookmark',
            'setFiltersShown',
            'setFilterSelection',
            'setComponentRoute',
        ]),
        updateState(shownFilters) {
            this.setFiltersShown(shownFilters)
            this.addBookmark()
        },
        addBookmark() {
            createBookmark(this.$router)
        },
        refreshFilterView() {
            // Refresh the filtercomponent
            this.renderCount++
        },
    },
    watch: {
        '$route.query': function(query) {
            // need to check if component triggered query, if so ignore.
            if (!this.componentRoute) {
                this.applyBookmark(query.bookmark)
                this.refreshFilterView()
            } else this.setComponentRoute(false)
        },
    },
})