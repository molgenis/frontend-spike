<component>
    <div class="entity-table" v-if="tableData && tableData.items && tableData.items.length > 0 && tableMeta">
        <div class="alert alert-warning" v-if="entitiesToShow.length === 0">
            {{ 'dataexplorer_empty_shopping_cart' | i18n}}
        </div>
        <div v-else>
            <button @click="closeShoppingCart" class="btn btn-primary cart-back mr-2" v-if="entitiesToShow.length > 5">
                <font-awesome-icon icon="chevron-left" /> Back
            </button>
            <button v-if="entitiesToShow.length > 5" class="btn btn-success cart-order mr-2">
                <font-awesome-icon icon="shopping-bag" /> Order
            </button>
            <table class="table">
                <table-header :is-shop="true" :visible-columns="visibleColumns" />
                <tbody>
                    <table-row
                        v-for="(entity, index) in entitiesToShow"
                        :id="getEntityId(entity)"
                        :key="index"
                        :is-selected="isSelected(entity)"
                        :is-shop="true"
                        :row-data="entity"
                        :table-name="tableName"
                        :visible-columns="visibleColumns"
                    />
                </tbody>
            </table>
        </div>
        <button class="btn btn-primary cart-back mr-2" @click="closeShoppingCart">
            <font-awesome-icon icon="chevron-left" /> Back
        </button>
        <button v-if="entitiesToShow.length > 0" class="btn btn-success cart-order mr-2">
            <font-awesome-icon icon="shopping-bag" /> Order
        </button>
    </div>
</component>
