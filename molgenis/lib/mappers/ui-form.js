import api from '@molgenis/molgenis-api-client/dist/molgenis-api-client.js'
import moment from 'moment'
import UriGenerator from '/molgenis/lib/helpers/ui-form/uri-generator.js'
import { encodeRsqlValue, transformToRSQL } from '@molgenis/rsql'
import { isRequired, isValid, isVisible } from '/molgenis/lib/helpers/ui-form/expression-evaluator.js'


const DEFAULTS = {
    booleanLabels: {
        falseLabel: 'False',
        trueLabel: 'True',
    },
    mapperMode: 'UPDATE',
    showNonVisibleAttributes: false,
}

// Create an object type UserException
function MappingException(message) {
    this.message = message
    this.name = 'MappingException'
}


MappingException.prototype.toString = function() {
    return this.name + ': "' + this.message + '"'
}


const fetchFieldOptions = (refEntity, search) => {
    const idAttribute = refEntity.idAttribute
    const labelAttribute = refEntity.labelAttribute ? refEntity.labelAttribute : refEntity.idAttribute

    // map refEntity.hrefCollection v1 URLs to v2 to enable the use of RSQL queries
    let uri = refEntity.hrefCollection.replace('/v1/', '/v2/')

    uri = UriGenerator.generateUri(search, uri, idAttribute, labelAttribute)

    return api.get(uri).then(response => {
        return response.items.map(item => {
            return {
                id: item[idAttribute],
                label: item[labelAttribute],
                value: item[idAttribute],
            }
        })
    })
}


const getFieldOptions = (attribute, options) => {
    const fetchOptionsFunction = (search) => {
        return fetchFieldOptions(attribute.refEntity, search).then(response => {
            return response
        })
    }

    switch (attribute.fieldType) {
    case 'CATEGORICAL':
    case 'CATEGORICAL_MREF':
        if (attribute.categoricalOptions) {
            return () => Promise.resolve(attribute.categoricalOptions.map(option => {
                option.value = option.id
                return option
            }))
        } else {
            return fetchOptionsFunction
        }
    case 'ONE_TO_MANY':
    case 'XREF':
    case 'MREF':
        return fetchOptionsFunction
    case 'ENUM':
        const enumOptions = attribute.enumOptions.map(option => {
            return {
                id: option,
                label: option,
                value: option,
            }
        })
        return () => Promise.resolve(enumOptions)
    case 'BOOL':
        const boolOptions = [
            { id: 'true', value: true, label: options.booleanLabels.trueLabel },
            { id: 'false', value: false, label: options.booleanLabels.falseLabel },
        ]
        return () => Promise.resolve(boolOptions)
    default:
        return null
    }
}


const getHtmlFieldType = (fieldType) => {
    switch (fieldType) {
    case 'BOOL':
    case 'CATEGORICAL':
    case 'ENUM':
        return 'radio'
    case 'XREF':
        return 'single-select'
    case 'ONE_TO_MANY':
    case 'MREF':
        return 'multi-select'
    case 'INT':
        return 'integer'
    case 'DECIMAL':
        return 'decimal'
    case 'LONG':
        return 'long'
    case 'TEXT':
        return 'text-area'
    case 'SCRIPT':
        return 'script'
    case 'HTML':
        return 'html'
    case 'DATE':
        return 'date'
    case 'DATE_TIME':
        return 'date-time'
    case 'CATEGORICAL_MREF':
        return 'checkbox'
    case 'STRING':
        return 'text'
    case 'HYPERLINK':
        return 'url'
    case 'EMAIL':
        return 'email'
    case 'FILE':
        return 'file'
    case 'COMPOUND':
        return 'field-group'
    default:
        throw new MappingException(`unknown fieldType (${fieldType})`)
    }
}


const buildIsUniqueFunction = (attribute, entityMetadata, mapperOptions) => {
    // no need to check uniqueness if uniqueness is not required, or uniqueness check not supported for field type
    // todo maybe add support for multi value field types
    if (!attribute.unique || attribute.fieldType === 'CATEGORICAL_MREF' || attribute.fieldType === 'MREF' || attribute.fieldType === 'ONE_TO_MANY') {
        return () => Promise.resolve(true)
    }

    return (proposedValue, data) => {
        return new Promise((resolve, reject) => {
            let query = { arguments: proposedValue, comparison: '==', selector: attribute.name }
            if (mapperOptions.mapperMode === 'UPDATE') {
                query = {
                    operands: [
                        query,
                        {
                            arguments: data[entityMetadata.idAttribute], // to validate uniqueness in update mode there must be a id value present
                            comparison: '!=',
                            selector: entityMetadata.idAttribute,
                        },
                    ],
                    operator: 'AND',
                }
            }

            const testUniqueUrl = entityMetadata.hrefCollection + '?&num=1&q=' + encodeRsqlValue(transformToRSQL(query))
            return api.get(testUniqueUrl).then((response) => {
                resolve(response.items.length <= 0)
            }, (error) => {
                reject(error)
            })
        })
    }
}


const isDisabledField = (attribute, entityMetaData, mapperOptions) => {
    if (attribute.fieldType === 'ONE_TO_MANY') {
        return true
    }

    if (mapperOptions.mapperMode === 'CREATE') {
        return false
    }

    if (mapperOptions.mapperMode === 'UPDATE' && attribute.name === entityMetaData.idAttribute) {
        return true
    }

    return attribute.readOnly
}


const generateFormSchemaField = (attribute, entityMetadata, mapperOptions) => {
    // options is a function that always returns an array of option objects
    const options = getFieldOptions(attribute, mapperOptions)
    const isDisabled = isDisabledField(attribute, entityMetadata, mapperOptions)
    let fieldProperties = {
        description: attribute.description,
        disabled: isDisabled,
        id: attribute.name,
        label: attribute.label,
        readOnly: isDisabled,
        required: isRequired(attribute),
        type: getHtmlFieldType(attribute.fieldType),
        unique: buildIsUniqueFunction(attribute, entityMetadata, mapperOptions),
        validate: isValid(attribute),
        visible: isVisible(attribute, mapperOptions),
    }

    if (attribute.fieldType === 'COMPOUND') {
        const children = attribute.attributes.map(attribute => generateFormSchemaField(attribute, entityMetadata, mapperOptions))
        fieldProperties = { ...fieldProperties, children }
    }

    if ((attribute.fieldType === 'INT' || attribute.fieldType === 'LONG') && attribute.range) {
        let range = {}
        if (attribute.range.hasOwnProperty('min')) {
            range.min = attribute.range.min
        }
        if (attribute.range.hasOwnProperty('max')) {
            range.max = attribute.range.max
        }

        fieldProperties = { ...fieldProperties, range }
    }

    return options ? { ...fieldProperties, options } : fieldProperties
}

const toISO8601DateString = (molgenisDate) => moment(molgenisDate, moment.ISO_8601, true).format('YYYY-MM-DD')

const getFieldValue = (fieldType, fieldData, refEntityIdAttribute) => {
    switch (fieldType) {
    case 'file':
        return fieldData ? fieldData.filename : undefined
    case 'checkbox':
    case 'multi-select':
        return fieldData && fieldData.map(data => data[refEntityIdAttribute])
    case 'radio':
    case 'single-select':
        return fieldData && typeof fieldData === 'object' ? fieldData[refEntityIdAttribute] : fieldData
    case 'date':
        return fieldData && toISO8601DateString(fieldData)
    default:
        return fieldData
    }
}

const getDefaultValue = (fieldType, defaultValue) => {
    switch (fieldType) {
    case 'BOOL':
        return defaultValue === 'true' ? true : defaultValue === 'false' ? false : defaultValue === 'null' ? null : undefined
    case 'CATEGORICAL_MREF':
    case 'MREF':
        return defaultValue && defaultValue.split(',').map(item => item.trim())
    case 'DATE':
        return defaultValue && toISO8601DateString(defaultValue)
    default:
        return defaultValue
    }
}


const generateFormData = (fields, data, attributes, options) => {
    return attributes.reduce((accumulator, attribute) => {
        const field = fields.find(field => attribute.name === field.id)
        const idAttribute = attribute.refEntity && attribute.refEntity.idAttribute

        if (!field) {
            accumulator[attribute.name] = data[attribute.name]
            return accumulator
        }

        if (field.type === 'field-group') {
            return { ...accumulator, ...generateFormData(field.children, data, attribute.attributes, options) }
        }

        accumulator[field.id] = options.mapperMode === 'CREATE'
            ? getDefaultValue(attribute.fieldType, attribute.defaultValue)
            : getFieldValue(field.type, data[field.id], idAttribute)

        return accumulator
    }, {})
}


const isFormFieldAttribute = (attribute, options) => {
    return !(
        (options.mapperMode === 'CREATE' ? attribute.auto : attribute.auto && !attribute.visible) || // server side generated field
      (attribute.hasOwnProperty('expression') && attribute.expression.length > 0) // computed field
    )
}


const generateFormFields = (metaData, options) => {
    const { attributes, ...entityMetadata } = metaData
    return attributes
        .filter((attr) => {
            return isFormFieldAttribute(attr, options)
        })
        .map((attr) => {
            return generateFormSchemaField(attr, entityMetadata, options)
        })
}


const buildMapperSettings = (settings) => {
    if (!settings) {
        return DEFAULTS
    }

    const mapperMode = settings.mapperMode ? settings.mapperMode : DEFAULTS.mapperMode

    let booleanLabels = DEFAULTS.booleanLabels
    if (settings.booleanLabels) {
        booleanLabels = {
            falseLabel: settings.booleanLabels.falseLabel ? settings.booleanLabels.falseLabel : 'False',
            trueLabel: settings.booleanLabels.trueLabel ? settings.booleanLabels.trueLabel : 'True',
        }
    }

    let showNonVisibleAttributes = DEFAULTS.showNonVisibleAttributes
    if (typeof (settings.showNonVisibleAttributes) === 'boolean') {
        showNonVisibleAttributes = settings.showNonVisibleAttributes
    }

    return {
        booleanLabels,
        mapperMode,
        showNonVisibleAttributes,
    }
}


const generateForm = (metadata, data, userSettings) => {
    const mapperSettings = buildMapperSettings(userSettings)
    const formFields = generateFormFields(metadata, mapperSettings)
    const formData = generateFormData(formFields, data || {}, metadata.attributes, mapperSettings)

    return {
        formData,
        formFields,
    }
}

export default {
    generateForm,
}
