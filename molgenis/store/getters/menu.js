export const molgenisMenu = (state) => {
    const context = state.context
    if (!context || !context.menu) {
        return null
    }
    const result = {
        authenticated: context.authenticated,
        helpLink: context.helpLink,
        loginHref: context.loginHref,
        menu: context.menu,
        selectedPlugin: state.selectedPlugin,
    }
    // map optional keys
    if (context.hasOwnProperty('logoTop')) {
        result.topLogo = context.logoTop
    }
    if (context.hasOwnProperty('navBarLogo')) {
        result.navBarLogo = context.navBarLogo
    }
    if (context.hasOwnProperty('logoTopMaxHeight')) {
        result.topLogoMaxHeight = context.logoTopMaxHeight
    }
    return result
}

export const molgenisFooter = (state) => {
    const context = state.context
    if (!context) {
        return null
    }
    const result = {
        buildDate: context.buildDate,
        molgenisSite: 'https://www.molgenis.org',
        version: context.version,
    }
    if (state.appVersion) {
        result.appVersion = state.appVersion
    }
    if (context.additionalMessage) {
        result.additionalMessage = context.additionalMessage
    }
    return result
}

export default {
    molgenisFooter,
    molgenisMenu,
}
