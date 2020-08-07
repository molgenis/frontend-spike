import ExplorerCard from '../components/explorer/dataView/ExplorerCard'
import TableRow from '../components/explorer/dataView/TableRow'
import TableHeader from '../components/explorer/dataView/TableHeader'
import { mapActions, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingBag)

export default {
    name: 'EntityView',
    components: { ExplorerCard, TableRow, TableHeader, FontAwesomeIcon },
    props: {
        isShop: {
            type: Boolean,
            required: false,
            default: () => false,
        },
    },
    computed: {
        ...mapState('explorer', ['dataDisplayLayout', 'shoppingFilter', 'tableMeta', 'shoppedEntityItems', 'defaultEntityData', 'tableData']),
        idAttribute() {
            return this.tableMeta.idAttribute.name
        },
        labelAttribute() {
            return this.tableMeta.labelAttribute.name
        },
        tableHeaderToShow() {
            return Object.keys(this.entitiesToShow[0])
        },
        entitiesToShow() {
            if (this.shoppingFilter) {
                return this.tableData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
            } else {
                return this.tableData.items
            }
        },
    },
    methods: {
        ...mapActions('explorer', ['loadDefaultEntityData']),
        getEntityId(entity) {
            return entity[this.idAttribute].toString()
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
        getEntityLabel(entity) {
            return this.labelAttribute ? entity[this.labelAttribute].toString() : ''
        },
    },
}