<component>
    <div>
        <div>
            <div class="p-0 pl-3 d-flex justify-content-between align-items-center">
                <h2>Filters</h2>
                <button
                    @click="setHideFilters(true)"
                    class="btn btn-light m-2 btn-outline-secondary hide-filters"
                    title="Hide Filters"
                    type="button"
                >
                    <Icon icon="chevron-left" />
                </button>
            </div>
            <div class="p-2">
                <filter-container
                    v-if="isFilterDataLoaded"
                    :key="renderCount"
                    v-model="filterSelections"
                    :can-edit="true"
                    :filters="filters.definition"
                    :filters-shown="filterShown"
                    @update="updateState"
                />
            </div>
        </div>
    </div>
</component>
