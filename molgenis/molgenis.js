import App from '/molgenis/components/main/main.js'
import BootstrapVue from 'bootstrap-vue'
import vuepack from './vuepack.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from '@molgenis/molgenis-i18n-js'
import { library } from '@fortawesome/fontawesome-svg-core'
import router from './router.js'
import { SET_SHOW_HIDDEN_RESOURCES } from '/molgenis/store/mutations/navigator.js'
import store from './store/store.js'
import { sync } from 'vuex-router-sync'
import Vue from 'vue'

import { faCheckCircle, faFolderOpen, faHourglass, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faClone, faCut, faDownload, faEdit, faHome, faList, faPaste, faPlus, faSearch, faTimes, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'


const lng = 'en'
const fallbackLng = 'en'
const isSuperUser = true

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()

// Keeps the router and the store in sync @https://github.com/vuejs/vuex-router-sync
sync(store, router)


// Catch query parameters to render them when accessing a bookmark
router.beforeEach((to, from, next) => {
    // store.commit('setBookmark', to.query.bookmark ? to.query.bookmark : '')
    next()
})

library.add(faCheckCircle, faClone, faCut, faEdit, faDownload, faFolderOpen, faHome, faHourglass, faList, faPaste, faPlus, faSearch, faTimes, faTimesCircle, faTrash, faUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

const app = {components: vuepack()}
app.vm = new Vue({
    components: { App },
    el: '#app',
    router,
    store,
    template: '<App />',
})

globalThis.app = app
store.commit('navigator/' + SET_SHOW_HIDDEN_RESOURCES, isSuperUser)

