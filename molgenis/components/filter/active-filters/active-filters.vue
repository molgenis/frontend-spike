<component>
    <div>
        <button
            :key="key"
            @click="removeFilter(item)"
            class="active-filter btn btn-light m-1 btn-outline-secondary"
            type="button"
            v-for="(item, key) in activeValues"
        >
            {{ item.label }}: {{ item.value }}
            <font-awesome-icon
                class="ml-1"
                icon="times"
            />
        </button>
    </div>
</component>
