<component>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <clipboard-view v-if="showShoppingCart" />
                <div v-else>
                    <div class="row">
                        <div class="col">
                            <active-filters
                                :filters="filterDefinitions"
                                :value="activeFilterSelections"
                                @input="saveFilterState"
                            />
                        </div>
                    </div>
                    <select-layout-view />
                </div>
            </div>
        </div>
    </div>
</component>
