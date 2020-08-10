import PageComponent from '/molgenis/components/menu/page/page.js'


export default {
    components: { PageComponent },
    methods: {
        handleContextLoaded(context) {
            console.log(context)
        },
    },
    name: 'Molgenis',
}