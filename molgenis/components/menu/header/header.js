import HeaderImage from '../header-image/header-image.js'
import NavBar from '../navbar/navbar.js'


export default {
    components: { HeaderImage, NavBar },
    data() {
        return {
            headerHeight: null,
        }
    },
    mounted: function() {
        // Use nextTick to wait for chikderen to render as per vue api guide
        this.$nextTick(() => {
            this.headerHeight = this.$refs.stickyHeader.clientHeight
        })
    },
    name: 'HeaderComponent',
    props: ['molgenisMenu'],

}