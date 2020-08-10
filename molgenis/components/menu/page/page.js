import api from '@molgenis/molgenis-api-client'
import CookieWall from '../cookie-wall/cookie-wall.js'
import FooterComponent from '../footer/footer.js'
import HeaderComponent from '../header/header.js'

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