import { DELETE_SELECTED_RESOURCES } from '@/store/actions/navigator'

export default {
    name: 'NavigatorDeleteModal',
    methods: {
        deleteSelectedResources: function() {
            this.$store.dispatch('navigator/' + DELETE_SELECTED_RESOURCES)
        },
    },
}