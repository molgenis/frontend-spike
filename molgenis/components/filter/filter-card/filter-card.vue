<component>
    <b-card
        class="filter-card mb-2"
        no-body
    >
        <b-card-header
            :class="collapsable ? 'collapsable' : ''"
            @click="toggleState"
            class="drag-handle"
        >
            <div
                :title="label"
                class="title mr-3 px-1"
            >
                <font-awesome-icon
                    :style="iconStyle"
                    class="mr-2"
                    icon="caret-right"
                    v-if="collapsable"
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
