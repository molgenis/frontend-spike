<component>
    <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
    <validate :custom="{'validate': isValid, maxlength: notTooLong}" :debounce="1" :state="fieldState">
        <div class="form-group">
            <label :for="field.id">{{ field.label }}</label>
            <div :class="{'border border-danger': isInvalid}">
                <vue-code
                    :id="field.id"
                    :name="field.id"
                    :options="options"
                    :required="isRequired"
                    v-model="localValue"
                />
            </div>
            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages :field-id="field.id" :field-state="fieldState" :maxlength="maxlength" />
        </div>
    </validate>
</component>