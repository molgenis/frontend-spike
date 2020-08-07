export default {
    computed: {
        query: {
            get: function() {
                return this.$store.state.route.query.q
            },
            set: function(query) {
                this.$router.push({
                    params: {...this.$route.params, folder: undefined},
                    path: '/',
                    query: query ? {...this.$route.query, q: query} : undefined,
                })
            },
        },
    },
    name: 'NavigatorSearch',
}