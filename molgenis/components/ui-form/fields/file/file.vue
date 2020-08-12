<component>
    <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
    <validate :custom="{'validate': isValid}" :debounce="1" :state="fieldState">
        <!-- add hidden input to serve a holder for file input ( input with type file may not contain a value -->
        <input
            :id="field.id"
            :name="field.id"
            :required="isRequired"
            v-model="localValue"
            v-show="false"
        >
        <div class="form-group">
            <label
                :class="{ 'is-invalid' : this.fieldState && this.fieldState.$invalid && (this.fieldState.$touched || this.fieldState.$submitted || this.fieldState.$dirty)}"
                :for="field.id"
            >
                {{ field.label }}
            </label>
            <div class="custom-file" @click="clear">
                <input
                    class="custom-file-input"
                    :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                    :required="isRequired"
                    type="file"
                    @change="handleFileChange"
                >
                <label class="custom-file-label" :data-browse="buttonText" :for="field.id">{{ label }}</label>
            </div>

            <small :id="field.id + '-description'" class="form-text text-muted">
                {{ field.description }}
            </small>

            <form-field-messages :field-id="field.id" :field-state="fieldState" />
        </div>
    </validate>
</component>