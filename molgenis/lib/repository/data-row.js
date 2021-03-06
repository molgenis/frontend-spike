import api from '/molgenis/lib/api.js'


const flattenCompounds = (fields) => {
    return fields.reduce((accum, f) => {
        if (f.type === 'field-group') {
            accum = accum.concat(flattenCompounds(f.children))
        } else {
            accum.push(f)
        }
        return accum
    }, [])
}

const isFileIncluded = (formData, formFields) => {
    const flattendFields = flattenCompounds(formFields)
    const fieldsWithFile = flattendFields
        .filter((field) => field.type === 'file')
        .find((field) => typeof formData[field.id] !== 'string')

    return !!fieldsWithFile
}

export const appendToForm = (fields, formData, [key, value]) => {
    const isFile = value && fields.find((field) => field.id === key && field.type === 'file' && typeof value !== 'string')
    if (isFile) {
        formData.append(key, value, value.name)
    } else {
        const stringValue = value === undefined || value === null ? '' : value
        formData.append(key, stringValue)
    }
}

const buildFormData = (data, fields) => {
    const formData = new FormData()
    const flattendFields = flattenCompounds(fields)
    Object.entries(data).forEach((pair) => appendToForm(flattendFields, formData, pair))
    return formData
}

const doPost = (uri, formData, formFields) => {
    const containsFileData = isFileIncluded(formData, formFields)
    const options = {
        body: containsFileData ? buildFormData(formData, formFields) : JSON.stringify(formData),
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        method: 'POST',
    }

    return api.post(uri, options, containsFileData)
}


const parseEditResponse = (response) => {
    // noinspection JSUnusedLocalSymbols
    const { _href, _meta, ...rowData } = response
    return Promise.resolve({meta: _meta, rowData: rowData})
}

const fetchForCreate = (tableId) => api.get('/api/v2/' + tableId + '?num=0')

const fetchForUpdate = (tableId, rowId) => {
    return api.get('/api/v2/' + tableId + '/' + rowId).then(response => parseEditResponse(response))
}

const create = (formData, formFields, tableId) => {
    return doPost('/api/v1/' + tableId + '?_method=PUT', formData, formFields)
}

const update = (formData, formFields, tableId, rowId) => {
    return doPost('/api/v1/' + tableId + '/' + rowId + '?_method=PUT', formData, formFields)
}

const save = (formData, formFields, tableId, rowId) => {
    return rowId === null ? create(formData, formFields, tableId) : update(formData, formFields, tableId, rowId)
}

const fetch = (tableId, rowId) => rowId === null ? fetchForCreate(tableId) : fetchForUpdate(tableId, rowId)

export {
    save, fetch,
}
