import { mapActions, mapState } from 'vuex'


export default {
    computed: {
        ...mapState('explorer', [
            'tableName',
            'tableMeta',
            'tableSettings',
            'settingsTable',
        ]),
        ...mapState('header', [
            'packageTables',
        ]),
        selectableTabels() {
            return this.packageTables.filter(pt => pt.id !== this.tableMeta.id)
        },
    },
    methods: {
        ...mapActions('header', [
            'getGroupTabels',
        ]),
    },
    mounted() {
        this.getGroupTabels({ package: this.tableMeta.package })
    },
    name: 'PageHeaderView',
}