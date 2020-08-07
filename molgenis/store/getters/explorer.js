import { createRSQLQuery } from '@molgenis/molgenis/mappers/rsql.js'

export default {
    filterRsql: (state) =>
        state.tableMeta && createRSQLQuery(state.filters, state.searchText),
}
