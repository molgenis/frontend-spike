import ExplorerCard from '../components/explorer/dataView/ExplorerCard'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    name: 'CardView',
    props: {
        entitiesToShow: {
            type: Array,
            required: true,
        },
    },
    components: { ExplorerCard },
    computed: {
        ...mapState('explorer', ['tableMeta', 'shoppedEntityItems', 'tableSettings', 'tableName']),
        ...mapGetters('explorer', ['filterRsql']),
        idAttribute() {
            return this.tableMeta.idAttribute
        },
        labelAttribute() {
            return this.tableMeta.labelAttribute
        },
        numberOfAttributes() {
            return this.tableMeta.attributes.filter((attr) => { return attr.type !== 'compound' }).length
        },
    },
    methods: {
        ...mapActions('explorer', ['fetchCardViewData', 'fetchRowDataLabels']),
        getEntityId(entity) {
            return entity[this.idAttribute.name] ? entity[this.idAttribute.name].toString() : ''
        },
        getEntityLabel(entity) {
            return this.labelAttribute && entity[this.labelAttribute.name] ? entity[this.labelAttribute.name].toString() : this.getEntityId(entity).toString()
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
        handleExpandCard(entity) {
            this.fetchRowDataLabels({ rowId: this.getEntityId(entity) })
        },
    },
    /**
   * Todo temp watch, remove watch when sync is done via url
   */
    watch: {
        filterRsql: {
            handler: function() {
                this.fetchCardViewData()
            },
            immediate: true,
        },
    },
}