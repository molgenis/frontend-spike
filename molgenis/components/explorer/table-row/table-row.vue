<component>
    <tr>
        <td v-if="isShop">
            <ExplorerShoppingButton :id="id" :is-selected="isSelected" />
        </td>
        <td v-else>
            <div aria-label="row actions" class="btn-group" role="group">
                <button
                    class="btn btn-sm btn-link"
                    role="button"
                    @click="$eventBus.$emit('delete-item', id)"
                >
                    <Icon icon="trash" />
                </button>
                <a
                    class="btn btn-sm btn-link"
                    :href="'/plugin/data-row-edit/' + tableName + '/' + id"
                    role="button"
                >
                    <Icon icon="edit" />
                </a>
            </div>
        </td>
        <td v-for="(column, index) in visibleColumns" :key="index">
            {{ rowData[column.name] }}
        </td>
    </tr>
</component>
