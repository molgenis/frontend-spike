import api from '@molgenis/molgenis-api-client'


export default {
    data() {
        return {
            context: null,
            isContextLoaded: false,
        }
    },
    mounted() {
        api.get('/app-ui-context').then((context) => {
            this.context = context
            this.isContextLoaded = true
            this.$emit('contextLoaded', context)
        })
    },
    name: 'PageComponent',
}