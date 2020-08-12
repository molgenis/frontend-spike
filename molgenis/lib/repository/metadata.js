/* eslint-disable object-curly-spacing */
import * as mapper from './metadata-response.js'
import axios from 'axios'

const metaDataCache = {}
const metaDataCue = {}

const mapAndStore = (entityId, response) => {
    const entityType = response.data
    const metadata = mapper.toMetaData(entityType)

    // Cache mapped response to improve speed
    metaDataCache[entityId] = metadata
    return metadata
}

const fetchMetaDataById = async(entityId) => {
    if (metaDataCache[entityId]) {
        return metaDataCache[entityId]
    }
    if (metaDataCue[entityId]) {
        return metaDataCue[entityId].then((result) => {
            if (metaDataCache[entityId]) {
                return metaDataCache[entityId]
            }
            return mapAndStore(entityId, result)
        })
    }

    const response = axios.get(`/api/metadata/${entityId}`, {
        params: {
            flattenAttributes: true,
        },
    })

    metaDataCue[entityId] = response
    const resolved = await response
    return mapAndStore(entityId, resolved)
}

const fetchMetaDataByURL = async(url) => {
    return fetchMetaDataById(url.split('/').pop())
}

export {
    fetchMetaDataById,
    fetchMetaDataByURL,
}
