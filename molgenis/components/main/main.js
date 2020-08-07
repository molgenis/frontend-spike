import PageComponent from '@/components/menu/PageComponent.vue'

export default {
    components: { PageComponent },
    methods: {
        handleContextLoaded(context) {
            console.log(context)
        },
    },
    name: 'Molgenis',
}