import TableRow from '@/components/explorer/dataView/TableRow'
import TableHeader from '@/components/explorer/dataView/TableHeader'
import { mapActions, mapGetters, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
library.add(faShoppingBag)

export default {
    name: 'TableView',
    props: {
        entitiesToShow: {
            type: Array,
            required: true,
        },
    },
    components: { TableRow, TableHeader },
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
    /**
  * Todo temp watch, remove watch when sync is done via url
  */
    watch: {
        filterRsql: {
            handler: function() {
                this.fetchTableViewData({ tableName: this.tableName })
            },
            immediate: true,
        },
    },
}