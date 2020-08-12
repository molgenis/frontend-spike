<component>
    <div class="container-fluid">
        <ExplorerToast
            -toast-close-btn-clicked="clearToast"
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
                    <font-awesome-icon icon="chevron-up" />
                    <span class="ml-2">Filters</span>
                </button>

                <ViewsData v-if="!loading" />
            </div>
        </div>
    </div>
</component>
