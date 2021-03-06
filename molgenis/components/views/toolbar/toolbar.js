import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare, faShoppingBag, faShoppingCart, faSlidersH, faStore, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import { mapMutations, mapState } from 'vuex'

library.add(faShoppingCart, faTh, faThList, faSlidersH, faStore, faShoppingBag, faPlusSquare)

export default {
    computed: {
        ...mapState('explorer', [
            'dataDisplayLayout',
            'hideFilters',
            'showShoppingCart',
            'tableSettings',
            'searchText',
            'tableName',
        ]),
        searchText: {
            get() {
                return this.$store.state.searchText
            },
            set(value) {
                this.$store.commit('explorer/setSearchText', value)
            },
        },
    },
    methods: {
        ...mapMutations('explorer', [
            'setDataDisplayLayout',
            'setShowShoppingCart',
            'setHideFilters',
            'setFilterSelection',
            'setSearchText',
        ]),
        openShoppingCart() {
            this.setShowShoppingCart(true)
            this.setHideFilters(true)
        },
        toggleDataDisplayLayout() {
            const value = this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
            this.setDataDisplayLayout(value)
        },
    },
}