function InvalidSchemaException(message) {
    this.message = message
    this.name = 'InvalidSchemaException'
}

(InvalidSchemaException.prototype).toString = function() { return this.name + ': "' + this.message + '"' }

const isValidSchema = (formFields) => {
    const fieldIds = new Set()

    const notUnique = formFields.some(field => {
        return fieldIds.size === fieldIds.add(field.id).size
    })

    if (notUnique) {
        throw new InvalidSchemaException('Identifiers for fields inside your formFields must be unique!')
    }

    return true
}

export {
    isValidSchema,
}
