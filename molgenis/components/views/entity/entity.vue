<component>
    <div
        class="entity-table container-fluid"
        v-if="tableData && tableData.items.length > 0"
    >
        <div class="row" v-if="isShop && entitiesToShow.length === 0">
            <div class="alert alert-warning col" />
        </div>

        <div v-else-if="dataDisplayLayout==='cards'" class="row">
            <div class="col">
                <div class="card-columns">
                    <explorer-card
                        v-for="(entity, index) in entitiesToShow"
                        :id="getEntityId(entity)"
                        :key="index"
                        class="card"
                        :data-contents="entity"
                        :data-label="getEntityLabel(entity)"
                        :is-selected="isSelected(entity)"
                        :is-shop="isShop"
                    />
                </div>
            </div>
        </div>

        <div v-else class="row">
            <div class="col">
                <table class="table">
                    <table-header :header="tableHeaderToShow" :is-shop="isShop" />
                    <tbody>
                        <table-row
                            v-for="(entity, index) in entitiesToShow"
                            :id="getEntityId(entity)"
                            :key="index"
                            :is-selected="isSelected(entity)"
                            :is-shop="isShop"
                            :row-data="entity"
                        />
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="shoppingFilter && isShop" class="row">
            <div class="col">
                <button class="btn btn-success m-1">
                    <font-awesome-icon icon="shopping-bag" />
                    Order
                </button>
            </div>
        </div>
    </div>
</component>

