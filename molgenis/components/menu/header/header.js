export default {
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