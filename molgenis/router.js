import Vue from 'vue'
import Router from 'vue-router'
import navigatorRoutes from './routes/navigator'
import explorerRoutes from './routes/explorer'

Vue.use(Router)

let routes = []
routes = routes.concat(navigatorRoutes).concat(explorerRoutes)

console.log(routes)

export default new Router({
  mode: 'history',
  base: '/',
  routes
})
