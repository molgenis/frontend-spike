import BootstrapVue from 'bootstrap-vue'
import vuepack from './vuepack.js'
import { sync } from 'vuex-router-sync'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Router from './router.js'
import { SET_SHOW_HIDDEN_RESOURCES } from '/molgenis/store/mutations/navigator.js'
import store from './store/store.js'
import Vue from 'vue'
import vuexI18n from 'vuex-i18n';

import { faCheckCircle, faFolderOpen, faHourglass, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faClone, faCut, faDownload, faEdit, faHome, faList, faPaste, faPlus, faSearch, faTimes, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

const isSuperUser = true

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()

library.add(faCheckCircle, faClone, faCut, faEdit, faDownload, faFolderOpen, faHome, faHourglass, faList, faPaste, faPlus, faSearch, faTimes, faTimesCircle, faTrash, faUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(vuexI18n.plugin, store)

// Keeps the router and the store in sync @https://github.com/vuejs/vuex-router-sync


Vue.i18n.set('en')

const app = {}
app.components = vuepack(app)
const router = Router(app)
sync(store, router)

router.beforeEach((to, from, next) => {
    // store.commit('setBookmark', to.query.bookmark ? to.query.bookmark : '')
    next()
})

app.vm = new Vue({
    el: '#app',
    render: h => h(app.components.Main),
    router,
    store,
})

app.vm.$mount(document.querySelector('#app'))

export default app

globalThis.app = app

