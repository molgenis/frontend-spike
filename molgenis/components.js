

// Use Vuepack naming convention for templates.
import About from './components/about/about.js'


export default function(app) {
    app.templates = templates

    const components = {
        About,
    }


    for (const name of Object.keys(components)) {
        const definition = components[name](app)
        let component
        if (definition.components) {
            Object.assign(components, definition.components)
            component = definition.component

            for (const [name, component] of Object.entries(definition.components)) {
                let _component = component(app, definition.component)
                _component = Object.assign(_component, {
                    render: app.templates[name].r,
                    staticRenderFns: app.templates[name].s,
                })

                components[name] = Vue.component(name, _component)
            }
        } else {
            component = definition
        }
        Object.assign(component, {
            render: templates[name].r,
            staticRenderFns: templates[name].s,
        })

        components[name] = Vue.component(name, component)

    }

    for (const name of Object.keys(templates)) {
        if (!components[name]) {
            app.logger.warn(`component missing for template: ${name}`)
        }
    }


    return components
}