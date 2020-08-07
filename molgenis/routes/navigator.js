import Navigator from '../../components/navigator/Navigator'

export default [
    {
        name: 'navigator',
        path: '/navigator',
        component: Navigator
    },
    {
        name: 'navigator-folder',
        path: '/navigator/:folderId',
        component: Navigator
    }
]