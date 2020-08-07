import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '@/components/explorer/dataView/ExplorerCard'
import TableRow from '@/components/explorer/dataView/TableRow'
import TableHeader from '@/components/explorer/dataView/TableHeader'
import EndOfResults from '@/components/explorer/dataView/EndOfResults'
import { mapState } from 'vuex'

export default {
    name: 'SelectLayoutView',
    components: { ExplorerCard, TableRow, TableHeader, CardView, TableView, EndOfResults },
    computed: {
        ...mapState('explorer', ['dataDisplayLayout', 'dataDisplayLimit', 'tableMeta', 'tableData']),
    },
}