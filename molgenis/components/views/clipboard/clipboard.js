import TableRow from '../components/explorer/dataView/TableRow'
import TableHeader from '../components/explorer/dataView/TableHeader'
import { mapActions, mapMutations, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag, faChevronLeft)

export default {
    name: 'ClipboardView',
    components: { TableRow, TableHeader, FontAwesomeIcon },
    computed: {
        ...mapState('explorer', ['tableMeta', 'shoppedEntityItems', 'tableData', 'tableName']),
        idAttribute() {
            return this.tableMeta.idAttribute
        },
        entitiesToShow() {
            return this.tableData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
        },
        visibleColumns() {
            return this.tableMeta.attributes
                .filter(a => a.visible)
                .filter(a => a.idAttribute || a.labelAttribute || typeof a.lookupAttributeIndex === 'number')
                .map(a => ({ id: a.id, name: a.name }))
        },
    },
    methods: {
        ...mapActions('explorer', ['fetchTableViewData']),
        ...mapMutations('explorer', ['setShowShoppingCart', 'setHideFilters']),
        getEntityId(entity) {
            return entity[this.idAttribute.name].toString()
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
        closeShoppingCart() {
            this.setShowShoppingCart(false)
            this.setHideFilters(false)
        },
    },
}