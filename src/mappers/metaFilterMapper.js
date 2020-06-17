import { getFieldOptions } from './utils'

const fieldTypeToFilterType = {
  'string': 'string-filter',
  'text': 'string-filter',
  'html': 'string-filter',
  'int': 'range-filter',
  'long': 'range-filter',
  'decimal': 'range-filter',
  'bool': 'checkbox-filter',
  'date': 'date-time-filter',
  'datetime': 'date-time-filter',
  'email': 'string-filter',
  'hyperlink': 'string-filter',
  'categorical': 'checkbox-filter',
  'categorical_mref': 'checkbox-filter',
  'mref': 'multi-filter',
  'xref': 'multi-filter',
  'onetomany': 'multi-filter',
  'enum': 'checkbox-filter',
  'file': 'string-filter',
  'compound': 'compound-title'
}

const mapMetaToFilters = async (metaData) => {
  function findById (id) {
    const selection = metaData.attributes.filter((item) => item.id === id)
    return selection.length > 0 ? selection[0] : null
  }

  const filterDefinitions = metaData.attributes.filter((item) => {
    // Filter out undefined datatypes
    return fieldTypeToFilterType[item.type]
  })

  const constructedFilters = await Promise.all(filterDefinitions.map(async (attribute) => {
    const options = await getFieldOptions(attribute)
    // Base filter template
    let filterDefinition = {
      name: attribute.name,
      label: attribute.label,
      type: fieldTypeToFilterType[attribute.type],
      dataType: attribute.type,
      collapsable: true,
      collapsed: false
    }

    // Compound child
    if (attribute.parentAttributeId) {
      const parent = findById(attribute.parentAttributeId)
      if (parent !== null && parent.type === 'compound') {
        filterDefinition.compound = parent.name
      }
    }

    // Decimal
    if (attribute.type.includes('decimal')) {
      filterDefinition.step = 0.1
    }

    // Date
    if (attribute.type.includes('date')) {
      filterDefinition.time = false
    }
    if (attribute.type.includes('datetime')) {
      filterDefinition.time = true
    }

    // Range (number)
    if (filterDefinition.type === 'range-filter' && attribute.range) {
      if (attribute.range.max) {
        filterDefinition.max = attribute.range.max
      }
      if (attribute.range.min) {
        filterDefinition.min = attribute.range.min
      }
      if (attribute.range.max && attribute.range.min) {
        filterDefinition.useSlider = true
      }
    }

    return options ? { ...filterDefinition, options } : filterDefinition
  }))

  return {
    definition: constructedFilters
  }
}

export {
  mapMetaToFilters
}
