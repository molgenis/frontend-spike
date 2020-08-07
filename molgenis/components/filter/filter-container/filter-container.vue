<component>
  <div
    class="filter-container"
    @mouseup="drag=false"
  >
    <b-collapse
      id="mobile-button-toggle"
      :visible="doCollapse"
    >
      <button
        class="btn w-100 my-2 btn-outline-secondary"
        @click="mobileToggle=!mobileToggle"
      >
        {{ mobileToggle?'Hide filters':'Show filters' }}
      </button>
    </b-collapse>

    <b-collapse
      id="mobile-toggle"
      :visible="!doCollapse || mobileToggle"
    >
      <draggable
        v-model="filtersToShow"
        handle=".drag-handle"
        :class="{'dragdrop': doDragDrop, 'dragging': drag}"
        :disabled="!doDragDrop"
        @choose="drag=true"
        @end="drag=false"
        @input="selectionUpdate"
      >
        <transition-group>
          <filter-card
            v-for="filter in listOfVisibleFilters"
            :key="filter.name"
            v-bind="filter"
            :can-remove="canEdit"
            @removeFilter="removeFilter(filter.name)"
          >
            <component
              :is="filter.type"
              :name="filter.name"
              :value="value[filter.name]"
              v-bind="filter"
              @input="value => selectionChange(filter.name, value)"
            />
          </filter-card>
        </transition-group>
      </draggable>
      <add-filter-modal
        v-if="canEdit && listOfInvisibleFilters.length > 0"
        v-model="filtersToShow"
        :filters="listOfInvisibleFilters"
        @input="selectionUpdate"
      />
    </b-collapse>
  </div>
</component>
