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
                name: 'explorer-entity',
                path: '/explorer/:entity',
            },
            {
                name: 'dataexplorer',
                path: '/explorer*',
                redirect: {
                    name: 'explorer-entity',
                    params: { entity: 'root_hospital_patients' },
                },
            },

            {
                component: app.components.DataRowEdit,
                name: 'data-row-edit',
                path: '/data-row/:dataTableId/:dataRowId',
                props: true,
            },
            {
                component: app.components.DataRowEdit,
                name: 'data-row-new',
                path: '/data-row/:dataTableId',
                props: true,
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

