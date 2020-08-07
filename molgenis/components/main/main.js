import PageComponent from '@molgenis/molgenis/menu/page/page.js'


export default {
    components: { PageComponent },
    methods: {
        handleContextLoaded(context) {
            console.log(context)
        },
    },
    name: 'Molgenis',
}