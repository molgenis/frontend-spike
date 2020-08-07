import axios from 'axios'
import { fetchMetaDataByURL } from '@molgenis/molgenis/lib/repository/metadata.js'
import { toRsqlValue } from '@molgenis/rsql'


export const getCategoricals = (attributes) => attributes.filter(attribute => attribute.type.includes('categorical'))

export const getFieldOptions = async(attribute) => {
    const getOptions = async(href) => {
        let url = href
        if (window.location.hostname === 'localhost') {
            url = href.replace(':443', ':8080')
        }
        const metadata = await fetchMetaDataByURL(url)

        return async(nameAttribute = true, queryType = 'like', query) => {
            const nameAttr = metadata.labelAttribute ? metadata.labelAttribute.name : ''
            const idAttr = metadata.idAttribute.name
            let params = {}
            if (query) {
                params = {
                    q: `${nameAttribute ? nameAttr : idAttr}=${queryType}=${queryType === 'in' ? `(${query})` : toRsqlValue(query)}`,
                }
            }

            url = url.replace('/metadata/', '/data/')
            const data = await axios.get(url, { params: { ...params, flattenAttributes: true } })
            return Promise.resolve(
                data.data.items.map((i) => {
                    // @ts-ignore
                    return { value: i.data[idAttr], text: i.data[nameAttr] }
                }),
            )
        }
    }

    switch (attribute.type) {
    case 'categorical':
    case 'categorical_mref':
    case 'onetomany':
    case 'xref':
    case 'mref':
        return attribute.refEntityType ? getOptions(attribute.refEntityType) : null
    case 'enum':
        if (attribute.enumOptions) {
            const enumOptions = attribute.enumOptions.map(option => {
                return {
                    value: option,
                    text: option,
                }
            })
            return () => Promise.resolve(enumOptions)
        } else {
            return null
        }
    case 'bool':
        return () => Promise.resolve([
            { value: true, text: 'Yes' },
            { value: false, text: 'No' },
        ])
    default:
        return null
    }
}
