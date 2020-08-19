<component>
    <div class="container-fluid">
        <b-modal id="bv-modal-example" hide-footer>
            <template v-slot:modal-title>
                Using <code>$bvModal</code> Methods
            </template>
            <div class="d-block text-center">
                <h3>Hello From This Modal!</h3>
            </div>
            <b-button @click="$bvModal.hide('bv-modal-example')" block class="mt-3">
                Close Me
            </b-button>
        </b-modal>
        <ExplorerToast
            :toast-close-btn-clicked="clearToast"
            :message="toast.message"
            :type="toast.type"
            class="toast-component mt-2"
            v-if="toast"
        />
        <ViewsPageHeader v-if="!loading" />
        <div class="flex-mainview d-flex" :class="{'hidefilters': filters.hideSidebar}">
            <div class="flex-filter">
                <ViewsFilters v-if="!loading" />
            </div>
            <div class="flex-data ml-4">
                <button
                    v-if="filters.hideSidebar && !showShoppingCart"
                    class="btn btn-light m-0 btn-outline-secondary show-filters-button py-1"
                    title="Show Filters"
                    type="button"
                    @click="setHideFilters(false)"
                >
                    <Icon icon="chevron-up" />
                    <span class="ml-2">Filters</span>
                </button>

                <ViewsData v-if="!loading" />
            </div>
        </div>
    </div>
</component>
