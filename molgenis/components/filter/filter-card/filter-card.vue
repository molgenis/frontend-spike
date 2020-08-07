<component>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header
      class="drag-handle"
      :class="collapsable ? 'collapsable' : ''"
      @click="toggleState"
    >
      <div
        class="title mr-3 px-1"
        :title="label"
      >
        <font-awesome-icon
          v-if="collapsable"
          icon="caret-right"
          :style="iconStyle"
          class="mr-2"
        />
        {{ label }}
        <span
          v-if="canRemove"
          class="remove-button"
          @click.stop="removeFilter"
        >
          <font-awesome-icon icon="times" />
        </span>
      </div>
    </b-card-header>
    <b-collapse
      :id="name"
      v-model="isOpen"
    >
      <b-card-body>
        <b-form-group :description="description">
          <slot />
        </b-form-group>
      </b-card-body>
    </b-collapse>
  </b-card>
</component>
