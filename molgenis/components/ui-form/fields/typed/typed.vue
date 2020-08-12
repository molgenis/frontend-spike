<component>
    <validate
        :class="{'mlg-was-validated': wasValidated}"
        :custom="{validate: isValid, integer: isValidInt, long: isValidLong, unique: isUnique}"
        :debounce="inputDebounceTime"
        :state="fieldState"
    >
        <div class="form-group">
            <label :for="field.id">{{ field.label }}</label>

            <input
                :aria-describedby="field.id + '-description'"
                :class="{ 'is-invalid' : wasValidated && fieldState.$invalid}"
                :disabled="field.disabled"
                :id="field.id"
                :max="max"
                :maxlength="maxlength"
                :min="min"
                :name="field.id"
                :required="isRequired"
                :step="stepSize"
                :type="inputType"
                class="form-control"
                v-model="localValue"
            >

            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages
                :field-id="field.id" :field-state="fieldState"
                :max="max"
                :maxlength="maxlength" :min="min"
                :type="field.type"
            />
        </div>
    </validate>
</component>
