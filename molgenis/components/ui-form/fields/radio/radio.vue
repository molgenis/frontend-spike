<component>
    <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
    <validate
        :custom="{'validate': isValid, 'unique': isUnique}" :debounce="1"
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
                    :bool="localValue === true || localValue === false"
                    :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                    :disabled="field.disabled"
                    :id="field.id + '-' + index"
                    :name="field.id"
                    :required="isRequired"
                    :value="option.value"
                    class="form-check-input"
                    type="radio"
                    v-model="localValue"
                >
                <label class="form-check-label" :for="field.id + '-' + index">{{ option.label }}</label>
            </div>
            <div v-if="!isRequired" class="form-check">
                <input
                    :id="field.id + '-null'"
                    v-model="localValue"
                    class="form-check-input"
                    :name="field.id"
                    type="radio"
                    :value="null"
                >
                <label class="form-check-label" :for="field.id + '-null'">{{ nullOptionLabel }}</label>
            </div>

            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages :field-id="field.id" :field-state="fieldState" />
        </div>
    </validate>
</component>