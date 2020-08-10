import Navigator from '/molgenis/components/navigator/main/main.js'

export default [
    {
        component: Navigator,
        name: 'navigator',
        path: '/navigator',
    },
    {
        component: Navigator,
        name: 'navigator-folder',
        path: '/navigator/:folderId',
    },
]