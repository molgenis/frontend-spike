<component>
    <div class="toolbar row">
        <div class="col-4">
            <a
                :href="'/plugin/data-row-edit/' + tableName"
                class="btn btn-light btn-outline-secondary card-layout"
                role="button"
                v-if="!showShoppingCart"
            >
                <Icon icon="plus-square" />
                Add
            </a>
        </div>
        <div class="col-4">
            <ExplorerSearch v-model="searchText" />
        </div>
        <div class="col-4">
            <button
                v-if="!showShoppingCart && dataDisplayLayout === 'TableView'"
                class="btn btn-light ml-1 float-right btn-outline-secondary card-layout"
                @click="toggleDataDisplayLayout"
            >
                <Icon icon="th" />
                Card layout
            </button>
            <button
                v-else-if="!showShoppingCart"
                class="btn btn-light ml-1 float-right btn-outline-secondary table-layout"
                @click="toggleDataDisplayLayout"
            >
                <Icon icon="th-list" />
                Table layout
            </button>
            <button
                v-if="!showShoppingCart && tableSettings.isShop"
                class="btn btn-light ml-1 float-right btn-outline-secondary show-cart"
                @click="openShoppingCart"
            >
                <Icon icon="shopping-cart" />
                Show cart
            </button>
        </div>
    </div>
</component>
