export default {
    name: 'NavigatorSearch',
    computed: {
        query: {
            get: function() {
                return this.$store.state.route.query.q
            },
            set: function(query) {
                this.$router.push({
                    path: '/',
                    params: {...this.$route.params, folder: undefined},
                    query: query ? {...this.$route.query, q: query} : undefined,
                })
            },
        },
    },
}