import CardView from '../card/card.js'
import EndOfResults from '/molgenis/components/explorer/end-of-results/end-of-results.js'
import ExplorerCard from '/molgenis/components/explorer/explorer-card/explorer-card.js'
import { mapState } from 'vuex'
import TableHeader from '/molgenis/components/explorer/table-header/table-header.js'
import TableRow from '/molgenis/components/explorer/table-row/table-row.js'
import TableView from '../table/table.js'

export default {
    components: {
        CardView,
        EndOfResults,
        ExplorerCard,
        TableHeader,
        TableRow,
        TableView,
    },
    computed: {
        ...mapState('explorer', ['dataDisplayLayout', 'dataDisplayLimit', 'tableMeta', 'tableData']),
    },
    name: 'SelectLayoutView',
}