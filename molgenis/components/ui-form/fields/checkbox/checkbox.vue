<component>
    <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
    <validate
        :custom="{'validate': isValid}" :debounce="1"
        :state="fieldState"
        v-if="options.length > 0"
    >
        <div class="form-group">
            <label :for="field.id">{{ field.label }}</label>

            <div
                :aria-describedby="field.id + '-description'"
                :key="option.value"
                class="form-check"
                v-for="(option, index) in options"
            >
                <!-- Hardcode input type to prevent compile time errors with dynamic value + v-model on same input  -->
                <input
                    :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                    :disabled="field.disabled"
                    :id="field.id + '-' + index"
                    :name="field.id"
                    :required="isRequired"
                    :value="option.value"
                    class="form-check-input"
                    type="checkbox"
                    v-model="localValue"
                >
                <label class="form-check-label" :for="field.id + '-' + index">{{ option.label }}</label>
            </div>

            <button class="select-all btn btn-link btn-sm" type="button" @click="selectAll">
                <i>Select all</i>
            </button>
            <button class="deselect-all btn btn-link btn-sm" type="button" @click="deSelectAll">
                <i>Deselect all</i>
            </button>

            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages :field-id="field.id" :field-state="fieldState" />
        </div>
    </validate>
</component>