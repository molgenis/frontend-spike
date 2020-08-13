<component>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <ViewsClipboard v-if="showShoppingCart" />
                <div v-else>
                    <div class="row">
                        <div class="col">
                            <FilterActiveFilters
                                :filters="filterDefinitions"
                                :value="activeFilterSelections"
                                @input="saveFilterState"
                            />
                        </div>
                    </div>
                    <ViewsSelectLayout />
                </div>
            </div>
        </div>
    </div>
</component>
