import DataView from './DataView'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import FiltersView from './FiltersView'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import PageHeaderView from './PageHeaderView'
import ToastComponent from '@molgenis/molgenis/components/explorer/utils/ToastComponent'
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'


library.add(faChevronUp)

const deleteConfirmOptions = {
    cancelTitle: 'Cancel',
    centered: true,
    hideHeaderClose: false,
    okTitle: 'Delete',
    okVariant: 'danger',
}

export default Vue.extend({
    async beforeRouteUpdate(to, from, next) {
        await this.fetchViewData(to.params.entity)
        next()
    },
    components: {
        DataView,
        FiltersView,
        FontAwesomeIcon,
        PageHeaderView,
        ToastComponent,
    },
    computed: {
        ...mapState('explorer', [
            'filters',
            'toast',
            'showShoppingCart',
            'dataDisplayLayout',
            'tableName',
        ]),
    },
    created() {
        this.$eventBus.$on('delete-item', (data) => {
            this.handeldeleteItem(data)
        })
        this.fetchViewData(this.$route.params.entity)
    },
    data() {
        return {
            loading: false,
        }
    },
    destroyed() {
        this.$eventBus.$off('delete-item')
    },
    methods: {
        ...mapMutations('explorer', [
            'clearToast',
            'setHideFilters',
            'setTableName',
        ]),
        ...mapActions('explorer', [
            'deleteRow',
            'fetchTableMeta',
            'fetchCardViewData',
            'fetchTableViewData',
            'fetchTableMeta',
        ]),
        async fetchViewData(tableName) {
            if (this.tableName !== tableName) {
                this.loading = true
                await this.fetchTableMeta({ tableName })
                this.setTableName(tableName)
            }
            if (this.dataDisplayLayout === 'CardView') {
                this.fetchCardViewData()
            } else {
                this.fetchTableViewData()
            }
            this.loading = false
        },
        async handeldeleteItem(itemId) {
            const msg = 'Are you sure you want to delete this item ?'
            const isDeleteConfirmed = await this.$bvModal.msgBoxConfirm(msg, deleteConfirmOptions)
            if (isDeleteConfirmed) {
                this.deleteRow({ rowId: itemId })
            }
        },
    },
    name: 'MainView',
})