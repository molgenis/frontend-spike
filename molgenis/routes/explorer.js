import MainView from '@/views/MainView.vue'

export default [
    {
        path: '/explorer/:entity',
        name: 'dataexplorer-entity',
        component: MainView
    },
    {
        path: '/explorer/*',
        name: 'dataexplorer',
        redirect: {
            name: 'dataexplorer-entity',
            params: { entity: 'root_hospital_patients' }
        }
    }
]

