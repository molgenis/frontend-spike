import api from '@molgenis/molgenis-api-client'
import CookieWall from './CookieWall.vue'
import HeaderComponent from './HeaderComponent.vue'
import FooterComponent from './FooterComponent.vue'

export default {
    name: 'PageComponent',
    components: { CookieWall, HeaderComponent, FooterComponent },
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
}