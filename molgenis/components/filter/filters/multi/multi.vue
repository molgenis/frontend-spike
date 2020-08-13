<component>
    <div>
        <b-input-group>
            <b-form-input
                :name="name"
                :placeholder="placeholder"
                trim
                v-model="query"
            />
            <b-input-group-append>
                <b-button
                    :disabled="isLoading"
                    variant="outline-secondary"
                    @click.prevent="query= ''"
                >
                    <Icon
                        v-if="isLoading"
                        class="fa-spin"
                        icon="spinner"
                        size="xs"
                    />
                    <Icon
                        v-else
                        icon="times"
                    />
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <b-form-checkbox-group
            v-if="slicedOptions.length"
            v-model="selection"
            class="checkbox-list"
            :name="name"
            :options="slicedOptions"
            stacked
        />

        <b-link
            v-if="showCount < inputOptions.length"
            class="card-link"
            @click="showMore"
        >
            {{ showMoreText }}
        </b-link>
        <Icon
            v-if="foundOptionCount >= 100"
            v-b-popover.hover="'There are 100 or more results found, only the first 100 are available. Please refine your search.'"
            class="warning text-danger"
            icon="exclamation-triangle"
        />
    </div>
</component>
