import api from '@molgenis/molgenis-api-client'
import CookieWall from './CookieWall.vue'
import FooterComponent from './FooterComponent.vue'
import HeaderComponent from './HeaderComponent.vue'

export default {
    components: { CookieWall, FooterComponent, HeaderComponent},
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