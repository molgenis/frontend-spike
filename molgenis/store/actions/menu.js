import api from '/molgenis/lib/api.js'


export const fetchContext = async({ commit }) => {
    const response = await api.get('/app-ui-context')
    commit('setContext', response)
}

export default {
    fetchContext,
}
