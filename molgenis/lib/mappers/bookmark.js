import * as LZString from 'lz-string'
import store from '/molgenis/store/store.js'

// can be name or label
function getDataTypeForFilter(filterIdentifier) {
    const filterDefinitions = store.state.filters.definition
    const definitionForFilter = filterDefinitions.filter((fd) => {
        return fd.name === filterIdentifier || fd.label === filterIdentifier
    })[0]

    return definitionForFilter ? definitionForFilter.dataType : ''
}

function encodeBookmark(object) {
    if (object === null) return null // to clear the routing completely.

    const jsonString = JSON.stringify(object)
    const compressed = LZString.compressToBase64(jsonString)
    return { bookmark: compressed }
}

function decodeBookmark(encodedBookmark) {
    const decompressed = LZString.decompressFromBase64(decodeURIComponent(encodedBookmark))
    return JSON.parse(decompressed)
}

function convertBookmarkValue(value, dataType) {
    switch (dataType) {
    case 'string':
    case 'text':
    case 'html':
    case 'file':
    case 'hyperlink':
    case 'email':
        return decodeURI(value.toString())
    case 'bool':
    case 'categorical':
    case 'categorical_mref':
    case 'enum':
    case 'mref':
    case 'xref':
    case 'onetomany':
    case 'decimal':
    case 'int':
    case 'long':
        return value.split(',')
    case 'date':
    case 'datetime': // if its a date, we need to parse that.
        return value.split(',').map((isoString) => new Date(isoString))
    default:
        return ''
    }
}

function setBookmark(router, bookmark) {
    router.push(
        {
            name: router.name,
            path: router.path,
            query: encodeBookmark(bookmark),
        },
        // to prevent error, which occurs on routing to same page (Vue issue)
        () => { },
    )
}

function parseBookmark(encodedBookmark = '') {
    if (encodedBookmark === '') return

    const bookmark = decodeBookmark(encodedBookmark)
    let output = {}

    if (Object.keys(bookmark).length >= 1) {
        output.selections = {}

        for (let property in bookmark) {
            const propValue = bookmark[property]
            if (property === 'shown') {
                output.shown = propValue.split(',')
            } else if (property === 'searchText') {
                output.searchText = propValue
            } else {
                const dataType = getDataTypeForFilter(property)
                output.selections[property] = convertBookmarkValue(propValue, dataType)
            }
        }
    }
    return output
}

export const createBookmark = (router) => {
    store.commit('explorer/setComponentRoute', true)

    const shown = store.state.explorer.filters.shown
    const selections = store.state.explorer.filters.selections
    const searchText = store.state.explorer.searchText
    if (shown.length === 0) {
        setBookmark(router, null)
        return
    }
    const bookmark = {}
    bookmark.searchText = searchText
    bookmark.shown = encodeURI(shown.join(','))

    if (Object.keys(selections).length > 0) {
        for (let property in selections) {
            const value = selections[property]
            if (value === '' || value === null || value === undefined || value.length === 0) { break } // can't do if(!value) because that would also trigger if value === 0
            const dataType = getDataTypeForFilter(property)

            if (dataType.includes('date')) {
                bookmark[property] = encodeURI(value.map((date) => date.toISOString()).join(','))
            } else {
                if (Array.isArray(value)) {
                    bookmark[property] = encodeURI(value.join(','))
                } else {
                    bookmark[property] = encodeURI(value)
                }
            }
        }
    }
    setBookmark(router, bookmark)
}

// Bookmark is the source of truth. If no bookmark, then default.
export const applyFilters = (query, defaultShownFilters) => {
    const bookmarkedFilters = parseBookmark(query)

    if (!bookmarkedFilters) {
        store.commit('explorer/setFiltersShown', defaultShownFilters)
        return
    }
    if (bookmarkedFilters.searchText) {
        store.commit('explorer/setSearchText', bookmarkedFilters.searchText)
    }
    if (bookmarkedFilters.shown) {
        store.commit('explorer/setFiltersShown', bookmarkedFilters.shown)
    }
    if (bookmarkedFilters.selections) {
        store.commit('explorer/setFilterSelection', bookmarkedFilters.selections)
    }
}
