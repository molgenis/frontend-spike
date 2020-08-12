<component>
    <div class="input-group">
        <form @submit.prevent="handleSearchAction" class="form-group w-100">
            <div class="input-group">
                <input
                    aria-describedby="mg-data-explorer-search"
                    aria-label="Search data"
                    class="form-control"
                    placeholder="Search"
                    type="search"
                    v-model="searchText"
                >
                <div class="input-group-append">
                    <button
                        id="mg-data-explorer-search"
                        class="btn btn-outline-secondary"
                        type="submit"
                    >
                        <font-awesome-icon icon="search" />
                    </button>
                </div>
            </div>
        </form>
    </div>
</component>
