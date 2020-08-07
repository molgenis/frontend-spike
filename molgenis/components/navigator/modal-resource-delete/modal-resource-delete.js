import { DELETE_SELECTED_RESOURCES } from '@molgenis/molgenis/store/actions/navigator.js'

export default {
    methods: {
        deleteSelectedResources: function() {
            this.$store.dispatch('navigator/' + DELETE_SELECTED_RESOURCES)
        },
    },
    name: 'NavigatorDeleteModal',
}