import { INITIAL_STATE } from '/molgenis/store/state/metadata.js'

export const SET_PACKAGES = '__SET_PACKAGES__'
export const SET_LANGUAGE_CODES = '__SET_LANGUAGE_CODES__'
export const SET_ENTITY_TYPES = '__SET_ENTITY_TYPES__'
export const SET_SELECTED_ENTITY_TYPE_ID = '__SET_SELECTED_ENTITY_TYPE_ID__'
export const SET_ATTRIBUTE_TYPES = '__SET_ATTRIBUTE_TYPES__'
export const SET_EDITOR_ENTITY_TYPE = '__SET_EDITOR_ENTITY_TYPE__'
export const UPDATE_EDITOR_ENTITY_TYPE = '__UPDATE_EDITOR_ENTITY_TYPE__'
export const UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE = '__UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE__'
export const UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER = '__UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER__'
export const SET_SELECTED_ATTRIBUTE_ID = '__SET_SELECTED_ATTRIBUTE_ID__'
export const DELETE_SELECTED_ATTRIBUTE = '__DELETE_SELECTED_ATTRIBUTE__'

export const CREATE_ALERT = '__CREATE_ALERT__'
export const SET_LOADING = '__SET_LOADING__'

const SYS_PACKAGE_ID = 'sys'


const swapArrayElements = (array, originalIndex, targetIndex) => {
    if (array.length === 1) {
        return array
    }
    array.splice(targetIndex, 1,
        array.splice(originalIndex, 1, array[targetIndex])[0])
    return array
}


const filterNonVisibleEntities = (entities) => {
    return INITIAL_STATE.isSuperUser ? entities : entities.filter(
        entity => !entity.id.startsWith(SYS_PACKAGE_ID + '_'))
}


const filterNonVisiblePackages = (packages) => {
    if (INITIAL_STATE.isSuperUser) {
        return packages
    }

    return packages
        .filter(_package => _package.id !== SYS_PACKAGE_ID)
        .filter(_package => !_package.id.startsWith(SYS_PACKAGE_ID + '_'))
}

const compareByLabel = (a, b) => a.label && b.label ? a.label.localeCompare(
    b.label) : 0

const isReferenceType = (type) => {
    var isReferenceType
    switch (type) {
    case 'categorical':
    case 'categorical_mref':
    case 'file':
    case 'mref':
    case 'onetomany':
    case 'xref':
        isReferenceType = true
        break
    default:
        isReferenceType = false
        break
    }
    return isReferenceType
}

export default {
    [CREATE_ALERT](state, alert) {
        state.alert = alert
    },
    [DELETE_SELECTED_ATTRIBUTE](state, selectedAttributeId) {
        state.editorEntityType.attributes = state.editorEntityType.attributes.filter(
            attribute => attribute.id !== selectedAttributeId)
    },
    [SET_ATTRIBUTE_TYPES](state, attributeTypes) {
        state.attributeTypes = attributeTypes
    },
    [SET_EDITOR_ENTITY_TYPE](state, editorEntityType) {
        state.editorEntityType = editorEntityType
        state.initialEditorEntityType = JSON.parse(JSON.stringify(editorEntityType))
    },
    [SET_ENTITY_TYPES](state, entityTypes) {
        const visibleEntities = filterNonVisibleEntities(entityTypes)
        state.entityTypes = visibleEntities.sort(compareByLabel)
    },
    [SET_LANGUAGE_CODES](state, languageCodes) {
        state.languageCodes = languageCodes.slice().sort()
    },
    [SET_LOADING](state, loading) {
        state.loading = loading ? state.loading + 1 : state.loading - 1
    },
    [SET_PACKAGES](state, packages) {
        const visiblePackages = filterNonVisiblePackages(packages)
        state.packages = visiblePackages.sort(compareByLabel)
    },
    [SET_SELECTED_ATTRIBUTE_ID](state, selectedAttributeId) {
        state.selectedAttributeId = selectedAttributeId
    },
    [SET_SELECTED_ENTITY_TYPE_ID](state, entityTypeId) {
        state.selectedEntityTypeId = entityTypeId
    },
    [UPDATE_EDITOR_ENTITY_TYPE](state, update) {
        if (update.value && update.key === 'idAttribute') {
            update.value.readonly = true
            update.value.unique = true
            update.value.nullable = false

            const index = state.editorEntityType.attributes.findIndex(
                attribute => attribute.id === update.value.id)
            state.editorEntityType.attributes[index] = update.value
        }
        if (update.value && update.key === 'labelAttribute') {
            update.value.nullable = false
            update.value.visible = true

            const index = state.editorEntityType.attributes.findIndex(
                attribute => attribute.id === update.value.id)
            state.editorEntityType.attributes[index] = update.value
        }
        state.editorEntityType[update.key] = update.value
    },
    [UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE](state, update) {
        const index = state.editorEntityType.attributes.findIndex(
            attribute => attribute.id === state.selectedAttributeId)
        const key = update.key

        const attr = state.editorEntityType.attributes[index]
        if (key === 'type') {
            if (isReferenceType(attr.type) && !isReferenceType(update.value)) {
                attr.refEntityType = null
            }
            if (attr.type === 'onetomany' || update.value === 'onetomany') {
                attr.mappedByAttribute = null
                attr.orderBy = null
            }
            attr[key] = update.value
        } else if (key === 'mappedByAttribute') {
            if (update.value !== null && update.value.entity !== null) {
                attr.refEntityType = update.value.entity
                attr.orderBy = null
            }
        }
        state.editorEntityType.attributes[index][key] = update.value
    },
    [UPDATE_EDITOR_ENTITY_TYPE_ATTRIBUTE_ORDER](state, update) {
        const moveOrder = update.moveOrder
        const attributes = state.editorEntityType.attributes

        const originalIndex = update.selectedAttributeIndex
        const targetIndex = moveOrder === 'up'
            ? originalIndex - 1
            : originalIndex + 1

        state.editorEntityType.attributes = swapArrayElements(attributes,
            originalIndex, targetIndex)
    },
}
