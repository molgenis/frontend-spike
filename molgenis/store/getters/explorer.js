import { createRSQLQuery } from '/molgenis/lib/mappers/rsql.js'

export default {
    filterRsql: (state) =>
        state.tableMeta && createRSQLQuery(state.filters, state.searchText),
}
