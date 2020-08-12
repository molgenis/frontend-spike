<component>
    <div
        @mouseup="drag=false"
        class="filter-container"
    >
        <b-collapse
            id="mobile-button-toggle"
            :visible="doCollapse"
        >
            <button
                @click="mobileToggle=!mobileToggle"
                class="btn w-100 my-2 btn-outline-secondary"
            >
                {{ mobileToggle?'Hide filters':'Show filters' }}
            </button>
        </b-collapse>

        <b-collapse
            id="mobile-toggle"
            :visible="!doCollapse || mobileToggle"
        >
            <draggable
                :class="{'dragdrop': doDragDrop, 'dragging': drag}"
                :disabled="!doDragDrop"
                @choose="drag=true"
                @end="drag=false"
                @input="selectionUpdate"
                handle=".drag-handle"
                v-model="filtersToShow"
            >
                <transition-group>
                    <filter-card
                        :can-remove="canEdit"
                        :key="filter.name"
                        @remove-filter="removeFilter(filter.name)"
                        v-bind="filter"
                        v-for="filter in listOfVisibleFilters"
                    >
                        <component
                            :is="filter.type"
                            :name="filter.name"
                            :value="value[filter.name]"
                            @input="value => selectionChange(filter.name, value)"
                            v-bind="filter"
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
