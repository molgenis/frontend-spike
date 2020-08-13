
<component>
    <div>
        <b-input-group class="mb-1">
            <b-form-input
                :max="max"
                :min="min"
                :step="step"
                @input="handleRangeValueChange"
                class="text-center range-from"
                placeholder="from"
                type="number"
                v-model="rangeValue[0]"
            />
            <b-input-group-append>
                <b-button
                    class="clear-from"
                    variant="outline-secondary"
                    @click.prevent="setRangeValue(0, null)"
                >
                    <Icon icon="times" />
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <b-input-group>
            <b-form-input
                v-model="rangeValue[1]"
                class="text-center range-to"
                :max="max"
                :min="min"
                placeholder="to"
                :step="step"
                type="number"
                @input="handleRangeValueChange"
            />
            <b-input-group-append>
                <b-button
                    class="clear-to"
                    variant="outline-secondary"
                    @click.prevent="setRangeValue(1, null)"
                >
                    <Icon icon="times" />
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <vue-slider
            v-if="useSlider"
            v-model="rangeValue"
            class="mt-2"
            :interval="step"
            :max="max"
            :min="min"
            @change="handleRangeValueChange"
        />
        <small
            v-if="min != Number.MIN_SAFE_INTEGER && max != Number.MAX_SAFE_INTEGER"
            class="form-text text-muted"
        >In a range of {{ min }} and {{ max }}</small>
    </div>
</component>
