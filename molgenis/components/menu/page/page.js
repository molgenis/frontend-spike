import api from '/molgenis/lib/api.js'


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