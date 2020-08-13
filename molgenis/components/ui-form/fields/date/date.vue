<component>
    <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
    <validate :custom="{'validate': isValidDateTime(localValue) && isValid}" :debounce="1" :state="fieldState">
        <div class="form-group">
            <label :for="field.id">{{ field.label }}</label>

            <div class="input-group">
                <flat-pickr
                    :aria-describedby="field.id + '-description'"
                    :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                    :config="config"
                    :disabled="field.disabled"
                    :id="field.id"
                    :name="field.id"
                    :required="isRequired"
                    class="form-control"
                    v-model="localValue"
                />

                <div class="input-group-append">
                    <button
                        class="btn btn-outline-secondary" data-toggle
                        title="Toggle"
                        type="button"
                    >
                        <Icon icon="calendar" />
                    </button>
                    <button
                        v-if="!isRequired" class="date-field-clear-btn btn btn-outline-secondary"
                        title="Clear" type="button"
                        @click="clearValue"
                    >
                        <Icon icon="times" />
                    </button>
                </div>
            </div>

            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages :field-id="field.id" :field-state="fieldState" />
        </div>
    </validate>
</component>