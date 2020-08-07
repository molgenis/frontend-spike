import Vue from 'vue'
import FiltersView from './FiltersView'
import ToastComponent from '@/components/explorer/utils/ToastComponent'
import DataView from './DataView'
import { mapActions, mapMutations, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PageHeaderView from './PageHeaderView'

library.add(faChevronUp)

const deleteConfirmOptions = {
    okVariant: 'danger',
    okTitle: 'Delete',
    cancelTitle: 'Cancel',
    hideHeaderClose: false,
    centered: true,
}

export default Vue.extend({
    name: 'MainView',
    components: { FiltersView, DataView, ToastComponent, FontAwesomeIcon, PageHeaderView },
    computed: {
        ...mapState('explorer', [
            'filters',
            'toast',
            'showShoppingCart',
            'dataDisplayLayout',
            'tableName',
        ]),
    },
    data() {
        return {
            loading: false,
        }
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
        async handeldeleteItem(itemId) {
            const msg = 'Are you sure you want to delete this item ?'
            const isDeleteConfirmed = await this.$bvModal.msgBoxConfirm(msg, deleteConfirmOptions)
            if (isDeleteConfirmed) {
                this.deleteRow({ rowId: itemId })
            }
        },
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
    },
    created() {
        this.$eventBus.$on('delete-item', (data) => {
            this.handeldeleteItem(data)
        })
        this.fetchViewData(this.$route.params.entity)
    },
    destroyed() {
        this.$eventBus.$off('delete-item')
    },
    async beforeRouteUpdate(to, from, next) {
        await this.fetchViewData(to.params.entity)
        next()
    },
})