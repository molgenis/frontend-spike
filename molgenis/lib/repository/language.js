// @ts-ignore
import api from '@molgenis/molgenis-api-client'

export default {
  async getActivelangueges () {
    return api.get('/api/v2/sys_Language?q=active==true').then((response) => {
      return response.items.map((item) => ({ id: item.code, label: item.name }))
    })
  },
  async getSelectedlanguegeCode () {
    return api.get('/api/v2/sys_Language').then((response) => {
      return response.meta.languageCode
    })
  },
  async setSelectedLanguage (languageCode) {
    return api.post('/plugin/useraccount/language/update?languageCode=' + languageCode)
  }
}
