<component>
  <tr>
    <td v-if="isShop"><shopping-button :isSelected="isSelected" :id="id"></shopping-button></td>
    <td v-else>
      <div class="btn-group" role="group" aria-label="row actions">
        <button
          class="btn btn-sm btn-link"
          role="button"
          @click="$eventBus.$emit('delete-item', id)"
          >
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
        <a
          class="btn btn-sm btn-link"
          role="button"
          :href="'/plugin/data-row-edit/' + tableName + '/' + id">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </a>
      </div>
    </td>
    <td v-for="(column, index) in visibleColumns" :key="index">
      {{rowData[column.name]}}
    </td>
  </tr>
</component>
