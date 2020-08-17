import api from '@molgenis/molgenis-api-client'


export const fetchContext = async({ commit }) => {
    const response = await api.get('/app-ui-context')
    commit('setContext', response)
}

export default {
    fetchContext,
}
