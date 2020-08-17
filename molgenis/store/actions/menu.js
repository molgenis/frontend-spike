import api from '@molgenis/molgenis-api-client/dist/molgenis-api-client.js'


export const fetchContext = async({ commit }) => {
    const response = await api.get('/app-ui-context')
    commit('setContext', response)
}

export default {
    fetchContext,
}
