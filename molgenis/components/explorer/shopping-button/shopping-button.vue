<component>
    <button
        :class="{'btn-primary': isSelected, 'btn-outline-secondary': !isSelected}"
        @click="toggleShoppingItems(id)"
        class="btn-sm float-right text-nowrap shopping-button"
        type="button"
    >
        <Icon icon="minus" size="xs" v-if="isSelected" />
        <Icon v-else icon="plus" size="xs" />
        <Icon icon="shopping-cart" />
    </button>
</component>
