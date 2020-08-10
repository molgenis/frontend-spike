// import explorerRoutes from './routes/explorer.js'
// import navigatorRoutes from './routes/navigator.js'
import Router from 'vue-router'
import Vue from 'vue'


Vue.use(Router)

let routes = []
// routes = routes.concat(navigatorRoutes).concat(explorerRoutes)

export default new Router({
    base: '/',
    mode: 'history',
    routes,
})
