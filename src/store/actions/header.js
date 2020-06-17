import axios from 'axios'

export default {
  getGroupTabels: async ({ commit }, payload) => {
    const packageName = payload.package.split('/').pop()
    const query = `q=package==${packageName}`
    const filter = 'filter=id,label,package'
    const expand = 'expand=package'
    const resp = await axios.get(`/api/data/sys_md_EntityType?${expand}&${filter}&${query}`)
    const packageTables = resp.data.items.map((i) => {
      return {
        id: i.data.id,
        label: i.data.label
      }
    })
    commit('setPackageTables', packageTables)
    return packageTables
  }
}
