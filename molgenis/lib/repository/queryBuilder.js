const buildExpandQuery = (metaData, selectedAttributeNames) => {
  return metaData.attributes
    .filter(a => a.isReference)
    .filter(a => selectedAttributeNames.includes(a.name))
    .map(a => a.name)
    .join(',')
}

const buildExpandedAttributesQuery = (metaData, selectedAttributeNames) => {
  const expand = buildExpandQuery(metaData, selectedAttributeNames)
  const filter = selectedAttributeNames.join(',')
  return `expand=${expand}&filter=${filter}`
}

export {
  buildExpandedAttributesQuery
}
