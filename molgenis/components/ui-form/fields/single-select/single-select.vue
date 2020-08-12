<component>
    <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
    <validate :custom="{'validate': isValid}" :debounce="1" :state="fieldState">
        <div class="form-group">
            <label :for="field.id">{{ field.label }}</label>

            <div class="input-group">
                <v-select
                    :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                    :filterable="false"
                    :input-id="field.id"
                    :name="field.id"
                    :on-search="fetchOptions"
                    :options="options"
                    :required="isRequired"
                    class="form-control"
                    v-model="localValue"
                >
                    <div slot="no-options">
                        <small>{{ noOptionsMessage }}</small>
                    </div>
                </v-select>

                <div v-if="allowAddingOptions">
                    <button @click="addOptionClicked($event)" class="btn btn-outline-secondary mg-select-add-btn" type="button">
                        <i aria-hidden="true" class="fa fa-plus" />
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