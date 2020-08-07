<component>
    <div>
        <b-button
            class="w-100 mt-2 add-button"
            v-b-modal.modal-add-filter
            variant="outline-secondary"
        >
            Add a filter
            <font-awesome-icon
                class="ml-1"
                icon="plus"
            />
        </b-button>

        <b-modal
            id="modal-add-filter"
            :static="true"
            title="Add filter"
            @ok="addFilter"
            @show="resetModal"
        >
            <b-form-select
                v-model="selected"
                name="filter"
                :options="options"
            />
        </b-modal>
    </div>
</component>
