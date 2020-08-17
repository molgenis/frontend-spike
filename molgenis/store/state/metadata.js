export const INITIAL_STATE = window.__INITIAL_STATE__ || {}


const state = {
    alert: { message: null, type: null },
    attributeTypes: [],
    editorEntityType: {
        attributes: [],
        id: '',
        label: '',
        lookupAttributes: [],
        referringAttributes: [],
    },
    entityTypes: [],
    initialEditorEntityType: {
        attributes: [],
        id: '',
        label: '',
        lookupAttributes: [],
        referringAttributes: [],
    },
    languageCodes: [],
    loading: 0,
    packages: [],
    selectedAttributeId: null,
    selectedEntityTypeId: null,
}

export default state
