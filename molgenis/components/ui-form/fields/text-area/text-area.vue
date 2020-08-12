<component>
    <validate :custom="{'validate': isValid}" :debounce="inputDebounceTime" :state="fieldState">
        <div class="form-group">
            <label :for="field.id">{{ field.label }}</label>

            <textarea
                :aria-describedby="field.id + '-description'"
                :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                :disabled="field.disabled"
                :id="field.id"
                :maxlength="maxlength"
                :name="field.id"
                :required="isRequired"
                class="form-control"
                v-model="localValue"
            />

            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages :field-id="field.id" :field-state="fieldState" :maxlength="maxlength" />
        </div>
    </validate>
</component>
