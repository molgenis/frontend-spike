<component>
    <div class="entity-table" v-if="tableMeta && tableData">
        <div class="alert alert-warning" v-if="tableData && tableData.items && tableData.items.length === 0">
            {{ 'dataexplorer_empty_table' | i18n}}
        </div>
        <component
            :entities-to-show="(tableData && tableData.items) ? tableData.items : []"
            :is="dataDisplayLayout"
        />

        <end-of-results v-if="tableData && tableData.items && tableData.items.length >= dataDisplayLimit" class="mt-4" :data-display-limit="dataDisplayLimit" />
    </div>
</component>
