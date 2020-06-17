import { createRSQLQuery } from '@/mappers/rsqlMapper'

export default {
  filterRsql: (state) =>
    state.tableMeta && createRSQLQuery(state.filters, state.searchText)
}
