import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)


export default (app) => {
    return new Router({
        base: '/',
        mode: 'history',
        routes: [
            {
                component: app.components.ViewsMain,
                name: 'dataexplorer-entity',
                path: '/explorer/:entity',
            },
            {
                name: 'dataexplorer',
                path: '/explorer/*',
                redirect: {
                    name: 'dataexplorer-entity',
                    params: { entity: 'root_hospital_patients' },
                },
            },

            {
                component: DataRowEdit,
                path: '/:dataTableId/:dataRowId', // edit existing row
                props: true,
            },
            {
                component: DataRowEdit,
                path: '/:dataTableId', // add new row
                props: true,
            },
            {
                path: '/',
                redirect: to => {
                    window.location.href = window.location.origin + dataExplorerBaseUrl
                },
            },

            {
                component: app.components.NavigatorMain,
                name: 'navigator',
                path: '/navigator',
            },
            {
                component: app.components.NavigatorMain,
                name: 'navigator-folder',
                path: '/navigator/:folderId',
            },
        ],
    })
}

