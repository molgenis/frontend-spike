import TableSelect from '/molgenis/components/explorer/table-select/table-select.js'
import TableSettingsButton from '/molgenis/components/explorer/table-settings-button/table-settings-button.js'
import ToolbarView from '../toolbar/toolbar.js'
import { mapActions, mapState } from 'vuex'


export default {

    components: {
        TableSelect,
        TableSettingsButton,
        ToolbarView,
    },
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