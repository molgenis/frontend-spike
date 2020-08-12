<component>
    <button
        :class="{'btn-primary': isSelected, 'btn-outline-secondary': !isSelected}"
        @click="toggleShoppingItems(id)"
        class="btn-sm float-right text-nowrap shopping-button"
        type="button"
    >
        <font-awesome-icon icon="minus" size="xs" v-if="isSelected" />
        <font-awesome-icon v-else icon="plus" size="xs" />
        <font-awesome-icon icon="shopping-cart" />
    </button>
</component>
