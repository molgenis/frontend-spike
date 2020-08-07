import Vue from 'vue'
import ToolbarView from './ToolbarView'
import TableSelect from '@/components/explorer/TableSelect'
import TableSettingsButton from '@/components/explorer/utils/TableSettingsButton'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
    name: 'PageHeaderView',
    components: { ToolbarView, TableSettingsButton, TableSelect },
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
})