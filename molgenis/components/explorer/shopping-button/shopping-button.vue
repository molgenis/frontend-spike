<component>
  <button
    @click="toggleShoppingItems(id)"
    type="button"
    :class="{'btn-primary': isSelected, 'btn-outline-secondary': !isSelected}"
    class="btn-sm float-right text-nowrap shopping-button">
    <font-awesome-icon size="xs" v-if="isSelected" icon="minus"></font-awesome-icon>
    <font-awesome-icon size="xs" v-else icon="plus"></font-awesome-icon>
    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
  </button>
</component>
