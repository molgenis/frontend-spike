import ActiveFilters from '/molgenis/components/filter/active-filters/active-filters.js'
import ClipboardView from '../clipboard/clipboard.js'
import SelectLayoutView from '../select-layout/select-layout.js'
import { mapMutations, mapState } from 'vuex'


export default {

    components: {
        ActiveFilters,
        ClipboardView,
        SelectLayoutView,
    },
    computed: {
        ...mapState('explorer', [
            'showShoppingCart',
            'tableName',
            'tableMeta',
            'tableSettings',
            'searchText',
            'filters',
        ]),
        activeFilterSelections: (vm) => {
            return vm.searchText ? { ...vm.filters.selections, _search: vm.searchText } : vm.filters.selections
        },
        filterDefinitions: (vm) => {
            const searchDef = {
                label: 'search',
                name: '_search',
                type: 'string',
            }
            return vm.searchText ? [ ...vm.filters.definition, searchDef ] : vm.filters.definition
        },
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
            'setFilterSelection',
            'setSearchText',
        ]),
        saveFilterState(newSelections) {
            if (newSelections['_search'] === undefined) {
                this.setSearchText('')
            }
            this.setFilterSelection(newSelections)
        },
    },
    name: 'DataView',
}