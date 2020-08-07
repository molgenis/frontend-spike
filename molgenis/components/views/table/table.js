import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import TableHeader from '@molgenis/molgenis/components/explorer/table-header/table-header.js'
import TableRow from '@molgenis/molgenis/components/explorer/table-row/table-row.js'
import { mapActions, mapGetters, mapState } from 'vuex'


library.add(faShoppingBag)

export default {
    components: {
        TableHeader,
        TableRow,
    },
    computed: {
        ...mapState('explorer', ['tableName', 'tableMeta', 'shoppedEntityItems', 'isShop']),
        ...mapGetters('explorer', ['filterRsql']),
        idAttribute() {
            return this.tableMeta.idAttribute
        },
        visibleColumns() {
            return this.tableMeta.attributes
                .filter(a => a.visible)
                .map(a => ({ id: a.id, name: a.name }))
        },
    },
    methods: {
        ...mapActions('explorer', ['fetchTableViewData']),
        getEntityId(entity) {
            return entity[this.idAttribute.name].toString()
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
    },
    name: 'TableView',
    props: {
        entitiesToShow: {
            required: true,
            type: Array,
        },
    },
    watch: {
        filterRsql: {
            handler: function() {
                this.fetchTableViewData({ tableName: this.tableName })
            },
            immediate: true,
        },
    },
}