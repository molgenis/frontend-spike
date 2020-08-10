import ExplorerCard from '/molgenis/components/explorer/explorer-card/explorer-card.js'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import TableHeader from '/molgenis/components/explorer/table-header/table-header.js'
import TableRow from '/molgenis/components/explorer/table-row/table-row.js'
import { mapActions, mapState } from 'vuex'


library.add(faShoppingBag)

export default {

    components: {
        ExplorerCard,
        FontAwesomeIcon,
        TableHeader,
        TableRow,
    },
    computed: {
        ...mapState('explorer', ['dataDisplayLayout', 'shoppingFilter', 'tableMeta', 'shoppedEntityItems', 'defaultEntityData', 'tableData']),
        entitiesToShow() {
            if (this.shoppingFilter) {
                return this.tableData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
            } else {
                return this.tableData.items
            }
        },
        idAttribute() {
            return this.tableMeta.idAttribute.name
        },
        labelAttribute() {
            return this.tableMeta.labelAttribute.name
        },
        tableHeaderToShow() {
            return Object.keys(this.entitiesToShow[0])
        },

    },
    methods: {
        ...mapActions('explorer', ['loadDefaultEntityData']),
        getEntityId(entity) {
            return entity[this.idAttribute].toString()
        },
        getEntityLabel(entity) {
            return this.labelAttribute ? entity[this.labelAttribute].toString() : ''
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
    },
    name: 'EntityView',
    props: {
        isShop: {
            default: () => false,
            required: false,
            type: Boolean,
        },
    },
}