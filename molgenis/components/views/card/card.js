import ExplorerCard from '/molgenis/components/explorer/explorer-card/explorer-card.js'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
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
        handleExpandCard(entity) {
            this.fetchRowDataLabels({ rowId: this.getEntityId(entity) })
        },
        isSelected(entity) {
            return this.shoppedEntityItems.includes(this.getEntityId(entity))
        },
    },
    name: 'CardView',
    props: {
        entitiesToShow: {
            required: true,
            type: Array,
        },
    },
    watch: {
        filterRsql: {
            handler: function() {
                this.fetchCardViewData()
            },
            immediate: true,
        },
    },
}