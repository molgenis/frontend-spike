import { applyFilters } from '/molgenis/lib/mappers/bookmark.js'
import Vue from 'vue'


const defaultSettings = {
    collapseLimit: 5,
    customCardAttrs: '',
    customCardCode: null,
    defaultFilters: [],
    isShop: false,
    settingsRowId:  null,
}

export default {
    applyBookmark(state, bookmark) {
        applyFilters(bookmark || state.bookmark, state.tableSettings.defaultFilters)
    },
    clearToast(state) {
        state.toast = null
    },
    removeRow(state, { rowId }) {
        if (!state.tableData) {
            throw new Error('Cannot delete item from empty table')
        }
        // todo need to refacor state.tableData to look up list
        state.tableData.items.forEach((row, index) => {
            // @ts-ignore
            if (rowId && row[state.tableMeta.idAttribute.name].toString() === rowId.toString()) {
                // @ts-ignore
                Vue.delete(state.tableData.items, index)
            }
        })
    },
    setBookmark(state, bookmark) {
        Vue.set(state, 'bookmark', bookmark)
    },
    setComponentRoute(state, componentRoute) {
        state.componentRoute = componentRoute
    },
    setDataDisplayLayout(state, layout) {
        state.dataDisplayLayout = layout
    },
    setFilterDefinition(state, definition) {
        Vue.set(state.filters, 'definition', definition)
    },
    setFilterSelection(state, selections) {
        Vue.set(state.filters, 'selections', selections)
    },
    setFiltersShown(state, shown) {
        Vue.set(state.filters, 'shown', shown)
    },
    setHideFilters(state, hideFilters) {
        Vue.set(state.filters, 'hideSidebar', hideFilters)
    },
    setMetaData(state, metaData) {
        Vue.set(state, 'tableMeta', metaData)
    },
    setSearchText(state, searchText) {
        state.searchText = searchText
    },
    setShowShoppingCart(state, cart) {
        state.showShoppingCart = cart
    },
    setTableData(state, data) {
        state.tableData = data
    },
    setTableName(state, entity) {
        state.tableName = entity
    },
    setTableSettings(state, tableSettings) {
        const isPropSet = (prop) => typeof tableSettings[prop] !== 'undefined'
        state.tableSettings.isShop = isPropSet('shop') ? Boolean(tableSettings.shop) : defaultSettings.isShop
        state.tableSettings.collapseLimit = isPropSet('collapse_limit') ? parseInt(tableSettings.collapse_limit) : defaultSettings.collapseLimit
        state.tableSettings.settingsRowId = isPropSet('id') ? tableSettings.id : defaultSettings.settingsRowId
        state.tableSettings.customCardCode = isPropSet('card_template') ? tableSettings.card_template : defaultSettings.customCardCode
        state.tableSettings.customCardAttrs = isPropSet('template_attrs') ? tableSettings.template_attrs : defaultSettings.customCardAttrs
        state.tableSettings.defaultFilters = isPropSet('default_filters') ? tableSettings.default_filters.split(',').map(f => f.trim()) : defaultSettings.defaultFilters
    },
    setToast(state, toast) {
        state.toast = toast
    },
    toggleShoppingItems(state, id) {
        const index = state.shoppedEntityItems.indexOf(id)
        if (index !== -1) {
            state.shoppedEntityItems.splice(index, 1)
        } else {
            state.shoppedEntityItems.push(id)
        }
    },
    updateRowData(state, { rowId, rowData }) {
        if (!state.tableData) {
            throw new Error('cannot update empty table data')
        }
        // todo need to refacor state.tableData to look up list
        state.tableData.items.forEach((row, index) => {
            // @ts-ignore
            if (rowId && row[state.tableMeta.idAttribute.name].toString() === rowId.toString()) {
                // @ts-ignore
                Vue.set(state.tableData.items, index, rowData)
            }
        })
    },
}
