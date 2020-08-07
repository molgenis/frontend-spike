<component>
  <div>
    <b-button
      v-b-modal.modal-add-filter
      variant="outline-secondary"
      class="w-100 mt-2 add-button"
    >
      Add a filter
      <font-awesome-icon
        class="ml-1"
        icon="plus"
      />
    </b-button>

    <b-modal
      id="modal-add-filter"
      title="Add filter"
      :static="true"
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
