import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta } from './metaDataService'
import * as metaDataRepository from './metaDataRepository'
import axios from 'axios'
import { encodeRsqlValue } from '@molgenis/rsql'

// maps api response to object with as key the name of the column and as value the label of the value or a list of labels for mrefs
const levelOneRowMapper = async (rowData, metaData) => {
  if (!rowData.data) {
    throw new Error('invalid input: row data must have data property')
  }

  const metadataAttributeMap = metaData.attributes.reduce((accum, attr) => {
    accum[attr.name] = attr
    return accum
  }, {})

  const row = rowData.data
  let result = {}
  let keys = Object.keys(row)

  for (let i = 0; i < keys.length; i++) {
    const columnKey = keys[i]
    const value = row[columnKey]
    const attributeMetadata = metadataAttributeMap[columnKey]
    const isReference = attributeMetadata.isReference
    let resolvedValue
    if (isReference && attributeMetadata.refEntityType) {
      // @ts-ignore
      if (value.items) {
        resolvedValue = await getMrefLabel(attributeMetadata, value)
      } else {
        resolvedValue = await getRefLabel(attributeMetadata, value)
      }
    } else {
      resolvedValue = value
    }
    result[columnKey] = resolvedValue
  }

  return result
}

const getMrefLabel = async (attributeMetadata, rowDataItem) => {
  // The isMref already checks if the value.items is available
  // @ts-ignore
  const refMetadata = await metaDataRepository.fetchMetaDataByURL(attributeMetadata.refEntityType)
  // @ts-ignore
  const resolvedValue = rowDataItem.items.map((mrefValue) => mrefValue.data[refMetadata.labelAttribute.name]).join(', ')
  return resolvedValue
}

const getRefLabel = async (attributeMetadata, rowDataItem) => {
  // This is checked by isReference
  // @ts-ignore
  const refMetadata = await metaDataRepository.fetchMetaDataByURL(attributeMetadata.refEntityType)
  // @ts-ignore
  const resolvedValue = rowDataItem.data[refMetadata.labelAttribute.name]
  return resolvedValue
}
const apiResponseMapper = (rowData) => {
  if (rowData.data) {
    const row = rowData.data
    return Object.keys(row).reduce((accum, key) => {
      // check if ref
      if (typeof row[key] === 'object') {
        // This is checked by the line above
        // @ts-ignore
        accum[key] = levelNRowMapper(row[key])
      } else {
        accum[key] = row[key]
      }
      return accum
    }, {})
  }
}

const levelNRowMapper = (rowData) => {
  // check if mref
  if (rowData.items) {
    const rows = rowData.items
    return rows.map((rowData) => {
      return apiResponseMapper(rowData)
    })
  } else {
    return apiResponseMapper(rowData)
  }
}

const addFilterIfSet = (request, rsqlFilter) => {
  return rsqlFilter ? `${request}&q=${encodeRsqlValue(rsqlFilter)}` : request
}

const _buildSizeQueryParam = (dataDisplayLimit) => {
  return typeof dataDisplayLimit === 'number' ? `size=${dataDisplayLimit}&` : ''
}

const getTableDataDeepReference = async (
  tableId,
  metaData,
  coloms,
  rsqlQuery,
  dataDisplayLimit
) => {
  if (!coloms.includes(metaData.idAttribute.name)) {
    coloms.push(metaData.idAttribute.name)
  }

  if (metaData.labelAttribute !== undefined && !coloms.includes(metaData.labelAttribute.name)) {
    coloms.push(metaData.labelAttribute.name)
  }

  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, coloms)
  const size = _buildSizeQueryParam(dataDisplayLimit)
  const request = addFilterIfSet(`/api/data/${tableId}?${size}${expandReferencesQuery}`, rsqlQuery)
  const response = (await axios.get(request)).data
  const result = { items: response.items.map((item) => levelNRowMapper(item)) }
  return result
}

const getTableDataWithLabel = async (tableId, metaData, columns, rsqlQuery, dataDisplayLimit) => {
  const columnSet = new Set([...columns])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }

  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [...columnSet])
  const size = _buildSizeQueryParam(dataDisplayLimit)
  const request = addFilterIfSet(`/api/data/${tableId}?${size}${expandReferencesQuery}`, rsqlQuery)
  const response = (await axios.get(request)).data
  const result = { items: await Promise.all(response.items.map(async (item) => {
    return levelOneRowMapper(item, metaData)
  })) }
  return result
}

// called on row expand
const getRowDataWithReferenceLabels = async (tableId, rowId, metaData, dataDisplayLimit) => {
  const attributes = getAttributesfromMeta(metaData)
  // Todo: remove work around, needed as compounds are not passed by getAttributesfromMeta.
  // Adding id and label makes sure we get these fields.
  const columnSet = new Set([...attributes])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }
  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [...columnSet])
  const size = _buildSizeQueryParam(dataDisplayLimit)
  const response = await axios.get(`/api/data/${tableId}/${rowId}?${size}${expandReferencesQuery}`)
  return levelOneRowMapper(response.data, metaData)
}

const deleteRow = async (tableId, rowId) => {
  return axios.delete(`/api/data/${tableId}/${rowId}`)
}

export {
  getTableDataDeepReference,
  getTableDataWithLabel,
  getRowDataWithReferenceLabels,
  deleteRow
}
