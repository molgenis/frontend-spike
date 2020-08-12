<component>
    <table class="table" v-if="entitiesToShow.length">
        <table-header :is-shop="isShop" :visible-columns="visibleColumns" />
        <tbody>
            <table-row
                v-for="(entity, index) in entitiesToShow"
                :id="getEntityId(entity)"
                :key="index"
                :is-selected="isSelected(entity)"
                :is-shop="isShop"
                :row-data="entity"
                :table-name="tableName"
                :visible-columns="visibleColumns"
            />
        </tbody>
    </table>
</component>
