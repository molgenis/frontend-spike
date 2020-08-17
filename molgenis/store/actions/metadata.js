import api from '@molgenis/molgenis-api-client/dist/molgenis-api-client.js'


import {
    CREATE_ALERT,
    SET_ATTRIBUTE_TYPES,
    SET_EDITOR_ENTITY_TYPE,
    SET_ENTITY_TYPES,
    SET_LANGUAGE_CODES,
    SET_LOADING,
    SET_PACKAGES,
    SET_SELECTED_ATTRIBUTE_ID,
    SET_SELECTED_ENTITY_TYPE_ID,
    UPDATE_EDITOR_ENTITY_TYPE,
} from '/molgenis/store/mutations/metadata.js'


export const GET_PACKAGES = '__GET_PACKAGES__'
export const GET_ENTITY_TYPES = '__GET_ENTITY_TYPES__'
export const RESET_EDITOR_ENTITY_TYPE = '__RESET_EDITOR_ENTITY_TYPE__'
export const GET_EDITOR_ENTITY_TYPE = '__GET_EDITOR_ENTITY_TYPE__'
export const CREATE_ENTITY_TYPE = '__CREATE_ENTITY_TYPE__'
export const DELETE_ENTITY_TYPE = '__DELETE_ENTITY_TYPE__'
export const CREATE_ATTRIBUTE = '__CREATE_ATTRIBUTE__'
export const SAVE_EDITOR_ENTITY_TYPE = '__SAVE_EDITOR_ENTITY_TYPE__'
export const GET_ATTRIBUTE_TYPES = '__GET_ATTRIBUTE_TYPES__'

export const toLanguageCodes = (languageCodes) => {
    return languageCodes
}

export const toEntityType = (editorEntityType) => {
    return {
        abstract0: editorEntityType.abstract0,
        attributes: editorEntityType.attributes.map(attribute => toAttribute(attribute)),
        backend: editorEntityType.backend,
        description: editorEntityType.description,
        descriptionI18n: editorEntityType.descriptionI18n,
        entityTypeParent: editorEntityType.entityTypeParent,
        id: editorEntityType.id,
        idAttribute: editorEntityType.idAttribute,
        isNew: false,
        label: editorEntityType.label,
        labelAttribute: editorEntityType.labelAttribute,
        labelI18n: editorEntityType.labelI18n,
        lookupAttributes: editorEntityType.lookupAttributes,
        package0: editorEntityType.package0,
        referringAttributes: editorEntityType.referringAttributes,
        tags: editorEntityType.tags,
    }
}

export const toAttribute = (attribute) => {
    return {
        aggregatable: attribute.aggregatable,
        auto: attribute.auto,
        cascadeDelete: attribute.cascadeDelete,
        defaultValue: attribute.defaultValue,
        description: attribute.description,
        descriptionI18n: attribute.descriptionI18n,
        enumOptions: attribute.enumOptions,
        expression: attribute.expression,
        id: attribute.id,
        isNew: false,
        label: attribute.label,
        labelI18n: attribute.labelI18n,
        mappedByAttribute: attribute.mappedByAttribute,
        name: attribute.name,
        nullable: attribute.nullable,
        nullableExpression: attribute.nullableExpression,
        orderBy: attribute.orderBy,
        parent: attribute.parent,
        rangeMax: attribute.maxRange,
        rangeMin: attribute.minRange,
        readonly: attribute.readonly,
        refEntityType: attribute.refEntityType,
        sequenceNumber: attribute.sequenceNumber,
        tags: attribute.tags,
        type: attribute.type,
        unique: attribute.unique,
        validationExpression: attribute.validationExpression,
        visible: attribute.visible,
        visibleExpression: attribute.visibleExpression,
    }
}

const withSpinner = (commit, promise) => {
    commit(SET_LOADING, true)
    promise.catch(error => {
        commit(CREATE_ALERT, {message: error, type: 'error'})
    }).then(() => commit(SET_LOADING, false), 1000)
}

function getEditorEntityType(commit, entityTypeId) {
    withSpinner(commit,
        api.get('/plugin/metadata-manager/entityType/' + entityTypeId).then(
            response => {
                commit(SET_LANGUAGE_CODES, toLanguageCodes(response.languageCodes))
                commit(SET_EDITOR_ENTITY_TYPE, toEntityType(response.entityType))
            }))
}

export default {
    [CREATE_ATTRIBUTE]({commit, state}) {
        withSpinner(commit,
            api.get('/plugin/metadata-manager/create/attribute').then(response => {
                const attribute = toAttribute(response.attribute)
                attribute.isNew = true
                commit(UPDATE_EDITOR_ENTITY_TYPE, {
                    key: 'attributes',
                    value: [...state.editorEntityType.attributes, attribute],
                })
                commit(SET_SELECTED_ATTRIBUTE_ID, attribute.id)
            }))
    },

    [CREATE_ENTITY_TYPE]({commit}) {
        withSpinner(commit,
            api.get('/plugin/metadata-manager/create/entityType').then(response => {
                const newEditorEntityType = toEntityType(response.entityType)
                newEditorEntityType.isNew = true
                commit(SET_EDITOR_ENTITY_TYPE, newEditorEntityType)
                commit(SET_SELECTED_ENTITY_TYPE_ID, newEditorEntityType.id)
            }))
    },

    [DELETE_ENTITY_TYPE]({commit, state}, selectedEntityTypeId) {
        withSpinner(commit,
            api.delete_('/api/v1/' + selectedEntityTypeId + '/meta').then(
                response => {
                    commit(SET_ENTITY_TYPES, state.entityTypes.filter(
                        entityType => entityType.id !== selectedEntityTypeId))
                    commit(SET_SELECTED_ENTITY_TYPE_ID, null)
                    commit(SET_SELECTED_ATTRIBUTE_ID, null)
                    commit(SET_EDITOR_ENTITY_TYPE, null)
                    commit(CREATE_ALERT, {
                        message: 'Delete was successful: ' + response.statusText,
                        type: 'info',
                    })
                }))
    },

    [GET_ATTRIBUTE_TYPES]({commit}) {
        withSpinner(commit,
            api.get('/api/v2/sys_md_Attribute/meta/type').then(response => {
                commit(SET_ATTRIBUTE_TYPES, response.enumOptions)
            }))
    },

    [GET_EDITOR_ENTITY_TYPE]({commit}, entityTypeId) {
        getEditorEntityType(commit, entityTypeId)
    },

    [GET_ENTITY_TYPES]({commit}) {
        withSpinner(commit,
            api.get('/api/v2/sys_md_EntityType?num=10000').then(response => {
                commit(SET_ENTITY_TYPES, response.items)
            }))
    },

    [GET_PACKAGES]({commit}) {
        withSpinner(commit,
            api.get('/plugin/metadata-manager/editorPackages').then(response => {
                commit(SET_PACKAGES, response)
            }))
    },

    [RESET_EDITOR_ENTITY_TYPE]({commit, state}) {
        if (state.selectedEntityTypeId != null && state.selectedEntityTypeId !== undefined) {
            getEditorEntityType(commit, state.selectedEntityTypeId)
        }
    },

    [SAVE_EDITOR_ENTITY_TYPE]({commit, state}, t) {
        const options = {
            body: JSON.stringify(state.editorEntityType),
        }
        withSpinner(commit,
            api.post('/plugin/metadata-manager/entityType', options).then(
                response => {
                    const msgParts = []
                    if (response.statusText) {
                        msgParts.push(response.statusText)
                    }
                    if (t('save-succes-message')) {
                        msgParts.push(t('save-succes-message'))
                    }
                    if (state.editorEntityType.label) {
                        msgParts.push(state.editorEntityType.label)
                    }
                    commit(CREATE_ALERT, {
                        message: msgParts.join(': '),
                        type: 'success',
                    })

                    const editorEntityType = JSON.parse(JSON.stringify(state.editorEntityType))
                    editorEntityType.attributes.forEach(attribute => {
                        attribute.isNew = false
                    })

                    if (state.editorEntityType.isNew) {
                        editorEntityType.isNew = false
                        commit(SET_SELECTED_ENTITY_TYPE_ID, editorEntityType.id)
                        commit(SET_ENTITY_TYPES, [...state.entityTypes, editorEntityType])
                    } else {
                        commit(SET_EDITOR_ENTITY_TYPE, editorEntityType)
                    }
                }))
    },
}
