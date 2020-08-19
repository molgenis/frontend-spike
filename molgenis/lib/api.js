import  merge from 'lodash/merge.js'

const defaultOptions = {
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
}

const isJsonResponse = (response) => {
    const contentType = response.headers.get('content-type')
    if (!contentType) {
        return false
    }
    // Ignore case, whitespace and double quotes around charset as per http spec (https://tools.ietf.org/html/rfc7231#section-3.1.1.5)
    const normalizedContentType = contentType.toLowerCase().split(' ').join('').split('"').join('')
    return normalizedContentType === 'application/json' || normalizedContentType === 'application/json;charset=utf-8'
}

const handleResponse = (response) => {
    if (isJsonResponse(response)) {
        return response.json().then(json => response.ok ? json : Promise.reject(json))
    } else {
        return response.ok ? response : Promise.reject(response)
    }
}


const mergeOptions = (method, options, force) => {
    return force ? { ...options, method: method } : merge({ method: method }, defaultOptions, options)
}


const get = (url, options_, forceOptions) => {
    return fetch(url, mergeOptions('GET', options_, forceOptions)).then(handleResponse).then(response => response)
}


const post = (url, options_, forceOptions) => {
    return fetch(url, mergeOptions('POST', options_, forceOptions)).then(handleResponse).then(response => response)
}


const put = (url, options_, forceOptions) => {
    return fetch(url, mergeOptions('PUT', options_, forceOptions)).then(handleResponse).then(response => response)
}


const delete_ = (url, options_, forceOptions) => {
    return fetch(url, mergeOptions('DELETE', options_, forceOptions)).then(handleResponse).then(response => response)
}

export default { delete_, get, post, put }