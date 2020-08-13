import BootstrapVue from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Router from './router.js'
import store from './store/store.js'
import { sync } from 'vuex-router-sync'
import Vue from 'vue'
import vuepack from './vuepack.js'
import vuexI18n from 'vuex-i18n';

import { faCheckCircle, faFolderOpen, faHourglass, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faClone, faCut, faDownload, faEdit, faHome, faList, faPaste, faPlus, faSearch, faTimes, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(vuexI18n.plugin, store)

Vue.prototype.$eventBus = new Vue()

library.add(faCheckCircle, faClone, faCut, faEdit, faDownload, faFolderOpen, faHome, faHourglass, faList, faPaste, faPlus, faSearch, faTimes, faTimesCircle, faTrash, faUpload)

Vue.component('Icon', FontAwesomeIcon)
Vue.i18n.set('en')

const app = {}
app.components = vuepack(app)
const router = Router(app)
sync(store, router)

app.vm = new Vue({
    el: '#app',
    render: h => h(app.components.Main),
    router,
    store,
})

app.vm.$mount(document.querySelector('#app'))
globalThis.app = app

export default app


