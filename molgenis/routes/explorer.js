import MainView from '@molgenis/molgenis/components/views/main/main.js'

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

