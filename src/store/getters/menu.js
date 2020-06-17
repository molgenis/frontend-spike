import { ContextState, MolgenisMenu, MolgenisFooter } from '../types'

export const molgenisMenu = (state: ContextState): MolgenisMenu | null => {
  const context = state.context
  if (!context || !context.menu) {
    return null
  }
  const result: MolgenisMenu = {
    menu: context.menu,
    helpLink: context.helpLink,
    authenticated: context.authenticated,
    selectedPlugin: state.selectedPlugin,
    loginHref: context.loginHref
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

export const molgenisFooter = (state: ContextState): MolgenisFooter | null => {
  const context = state.context
  if (!context) {
    return null
  }
  const result: MolgenisFooter = {
    version: context.version,
    buildDate: context.buildDate,
    molgenisSite: 'https://www.molgenis.org'
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
  molgenisMenu,
  molgenisFooter
}
