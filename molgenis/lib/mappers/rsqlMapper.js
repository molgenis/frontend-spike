import { Operator, ComparisonOperator, transformToRSQL } from '@molgenis/rsql'

export const createLikeQuery = (attributeName, selection) => ({ selector: attributeName, comparison: ComparisonOperator.Like, arguments: selection })
/**
 * Create an RSQL 'in' query for filters
 *
 * @example in query for a country filter
 * country=in=(NL,BE,DE)
 */
export const createInQuery = (attributeName, selection) => ({ selector: attributeName, comparison: ComparisonOperator.In, arguments: selection })
export const createEqualsQuery = (attributeName, selection) => ({ selector: attributeName, comparison: ComparisonOperator.Equals, arguments: selection })
export const createGreaterEqualQuery = (attributeName, selection) => ({ selector: attributeName, comparison: ComparisonOperator.GreaterThanOrEqualTo, arguments: selection })
export const createLesserEqualQuery = (attributeName, selection) => ({ selector: attributeName, comparison: ComparisonOperator.GreaterThanOrEqualTo, arguments: selection })
export const createRangeQuery = (attributeName, selection) => ({
  operator: Operator.And,
  operands: [
    { selector: attributeName, comparison: ComparisonOperator.GreaterThanOrEqualTo, arguments: selection[0] },
    { selector: attributeName, comparison: ComparisonOperator.LesserThanOrEqualTo, arguments: selection[1] }
  ]
})

export const createSearchQuery = (selection) => ({ selector: '*', comparison: ComparisonOperator.Search, arguments: selection })

/**
 *
 * Transform to RSQL
 *
 * @example queries
 * country=in=(NL,BE)
 */
export const createRSQLQuery = (filters, searchText) => {
  const operands = []
  let filterDefinitions = filters.definition
  let filterSelections = filters.selections

  if (searchText && searchText.length > 0) {
    filterDefinitions = [...filterDefinitions, {
      type: 'search-filter',
      label: 'search',
      name: '_search',
      dataType: 'string'
    }]
    filterSelections = { ...filters.selections, _search: searchText }
  }
  Object.keys(filterSelections).forEach((name) => {
    const selection = filterSelections[name]

    if (selection === undefined || (Array.isArray(selection) && selection.length === 0)) return
    const definition = filterDefinitions.filter((filter) => filter.name === name)[0]
    if (!definition || definition === null) return

    switch (definition.type) {
      case 'search-filter':
        // search filter case is only added when searchText is non empty, ignore null warning
        // @ts-ignore
        operands.push(createSearchQuery(searchText))
        break
      case 'checkbox-filter':
        if (definition.dataType === 'bool') {
          operands.push(createEqualsQuery(name, selection))
        } else {
          operands.push(createInQuery(name, selection))
        }
        break
      case 'string-filter':
        operands.push(createLikeQuery(name, selection))
        break
      case 'range-filter':
        if (selection[0] == null && selection[1] !== null) {
          // [null, value] -> filter less than a value
          operands.push(createLesserEqualQuery(name, selection[1]))
        } else if (selection[1] == null && selection[0] !== null) {
          // [value, null] -> filter greater than a value
          operands.push(createGreaterEqualQuery(name, selection[0]))
        } else if (selection[0] !== null && selection[1] !== null) {
          // [value, value] -> filter a range of values
          let correctedSelection = [Math.min(selection[0], selection[1]), Math.max(selection[0], selection[1])]
          operands.push(createRangeQuery(name, correctedSelection))
        }
        break
      case 'multi-filter':
        operands.push(createInQuery(name, selection))
        break
      case 'date-time-filter':
        operands.push(createRangeQuery(name, [selection[0].toISOString(), selection[1].toISOString()]))
        break
      default:
        return null
    }
  })
  if (operands.length === 0) return null

  const result = transformToRSQL({
    operator: Operator.And,
    operands: operands
  })
  return result
}
