export const getConfirmBeforeDeletingProperties = (identifier, t) => {
    return {
        cancelButtonText: t('confirm-before-delete-cancel'),
        confirmButtonText: t('confirm-before-delete-confirm'),
        showCancelButton: true,
        text: t('confirm-before-delete-text'),
        title: t('confirm-before-delete-title') + ' ' + identifier,
        type: 'warning',
    }
}

export const getConfirmBeforeLeavingProperties = (t) => {
    return {
        cancelButtonText: t('confirm-before-leaving-cancel'),
        confirmButtonText: t('confirm-before-leaving-confirm'),
        showCancelButton: true,
        text: t('confirm-before-leaving-text'),
        title: t('confirm-before-leaving-title'),
        type: 'warning',
    }
}

export default {
    getAbstractEntities: state => state.entityTypes && state.entityTypes.filter(function(entityType) {
        return entityType.isAbstract
    }),
    getAttributeTree: (state, getters) => {
        const allAttributes = state.editorEntityType ? state.editorEntityType.attributes : []
        const rootAttributes = allAttributes.filter(attribute => !attribute.parent)
        const addChildren = attr => {
            const children = allAttributes.filter(attribute => attribute.parent && attribute.parent.id === attr.id)
            const offspring = children.map(addChildren)
            const selected = getters.getSelectedAttribute && attr.id === getters.getSelectedAttribute.id
            return {...attr, children: offspring, selected}
        }
        return rootAttributes.map(addChildren)
    },
    getCompoundAttributes: state => state.editorEntityType && state.editorEntityType.attributes.filter(attribute => attribute.type === 'compound'),
    getEditorEntityTypeAttributes: state => state.editorEntityType && state.editorEntityType.attributes,
    getEditorEntityTypeHasBeenEdited: state => state.editorEntityType && JSON.stringify(state.editorEntityType) !== JSON.stringify(state.initialEditorEntityType),
    getIndexOfSelectedAttribute: state => state.editorEntityType && state.editorEntityType.attributes.findIndex(attribute => attribute.id === state.selectedAttributeId),
    getMappedByAttributes: state => {
        return state.initialEditorEntityType.referringAttributes
    },
    getSelectedAttribute: state => state.editorEntityType && state.editorEntityType.attributes.find(attribute => attribute.id === state.selectedAttributeId),
    getSelectedEntityType: state => state.entityTypes.find(entityType => entityType.id === state.selectedEntityTypeId),
}
