import evaluator from './evaluator.js'

const isVisible = (attribute, mapperOptions) => {
    const expression = attribute.visibleExpression

    if (expression) {
        return (data) => {
            try {
                return evaluator(expression, data)
            } catch (e) {
                evaluationLogging('Error evaluating visible expression', attribute.name, expression, e)
                return mapperOptions.showNonVisibleAttributes || attribute.visible
            }
        }
    }
    return () => mapperOptions.showNonVisibleAttributes || attribute.visible
}


const isRequired = (attribute) => {
    const expression = attribute.nullableExpression
    // If an attribute is nullable, it is NOT required
    if (expression) {
        return (data) => {
            try {
                return !evaluator(expression, data)
            } catch (e) {
                evaluationLogging('Error evaluating required expression', attribute.name, expression, e)
                return !attribute.nillable
            }
        }
    }
    return () => !attribute.nillable
}


const isValid = (attribute) => {
    const expression = attribute.validationExpression

    if (expression) {
        return (data) => {
            try {
                return evaluator(expression, data)
            } catch (e) {
                evaluationLogging('Error evaluating valid expression', attribute.name, expression, e)
                return true
            }
        }
    }
    return () => true
}


const evaluationLogging = (message, field, expression, e) => {
    if (console && console.warn) {
        const warningMessage = `${message} (field: ${field})
    ${expression}
    ${e.toString()}`

        console.warn(warningMessage)
    }
}

export { isValid, isRequired, isVisible }
