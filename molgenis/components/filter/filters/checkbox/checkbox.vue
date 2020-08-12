<component class="">
    <div>
        <b-form-checkbox-group
            :name="name"
            :options="visibleOptions"
            stacked
            v-model="selection"
        />
        <span v-if="bulkOperation">
            <b-link
                v-if="showToggleSlice"
                class="toggle-slice card-link"
                @click.prevent="toggleSlice"
            >
                {{ toggleSliceText }}
            </b-link>
            <b-link
                class="toggle-select card-link"
                @click.prevent="toggleSelect"
            >
                {{ toggleSelectText }}
            </b-link>
        </span>
    </div>
</component>