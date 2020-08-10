import MainView from '/molgenis/components/views/main/main.js'

export default [
    {
        component: MainView,
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
]

