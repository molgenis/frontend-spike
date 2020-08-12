export default function isCompoundVisible(field, data) {
    return field.type === 'field-group' && field.children !== undefined && field.children.some(child => {
        if (child.type === 'field-group') {
            return isCompoundVisible(child, data)
        }
        return child.visible(data)
    })
}
