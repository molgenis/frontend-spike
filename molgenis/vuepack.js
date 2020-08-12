import components from './components.js'
import templates from './templates.js'
import Vue from 'vue'


export default function(app) {
    let definitions = {}
    for (const name of Object.keys(components)) {
        let definition
        // A closure function to provide additional context.
        if (components[name].apply) {
            definition = components[name](app)
        } else {
            definition = components[name]
        }

        Object.assign(definition, {
            render: templates[name].r,
            staticRenderFns: templates[name].s,
        })

        definitions[name] = Vue.component(name, definition)
    }

    for (const name of Object.keys(templates)) {
        if (!components[name]) {
            console.warn(`component missing for template: ${name}`)
        }
    }

    return definitions
}
