import Vue from 'vue'
import SelectLayoutView from './SelectLayoutView'
import ClipboardView from './ClipboardView'
import { mapMutations, mapState } from 'vuex'
import ActiveFilters from '@/components/filter/ActiveFilters.vue'

export default Vue.extend({
    name: 'DataView',
    components: { SelectLayoutView, ClipboardView, ActiveFilters },
    computed: {
        ...mapState('explorer', [
            'showShoppingCart',
            'tableName',
            'tableMeta',
            'tableSettings',
            'searchText',
            'filters',
        ]),
        searchText: {
            get() {
                return this.$store.state.searchText
            },
            set(value) {
                this.$store.commit('explorer/setSearchText', value)
            },
        },
        activeFilterSelections: (vm) => {
            return vm.searchText ? { ...vm.filters.selections, _search: vm.searchText } : vm.filters.selections
        },
        filterDefinitions: (vm) => {
            const searchDef = {
                type: 'string',
                label: 'search',
                name: '_search',
            }
            return vm.searchText ? [ ...vm.filters.definition, searchDef ] : vm.filters.definition
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
})