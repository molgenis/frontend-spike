import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { mapActions, mapMutations, mapState } from 'vuex'


library.add(faShoppingBag, faChevronLeft)

export default {
    computed: {
        ...mapState('explorer', ['tableMeta', 'shoppedEntityItems', 'tableData', 'tableName']),
        entitiesToShow() {
            return this.tableData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
        },
        idAttribute() {
            return this.tableMeta.idAttribute
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
        closeShoppingCart() {
            this.setShowShoppingCart(false)
            this.setHideFilters(false)
        },
        getEntityId(entity) {
            return entity[this.idAttribute.name].toString()
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
    },
}