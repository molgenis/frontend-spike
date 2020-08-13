<component>
    <fieldset :class="{ 'required-field': isRequired }" :id="field.id + '-fs'" v-show="isVisible">
        <!-- Render checkbox field -->
        <template v-if="field.type === 'checkbox'">
            <cUiFormFieldsCheckbox
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-valid="isValid"
                v-model="formData[field.id]"
            />
        </template>

        <!-- Render code editor field-->
        <template v-else-if="field.type === 'html' || field.type === 'script'">
            <UiFormFieldsCodeEditor
                v-model="formData[field.id]"
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-valid="isValid"
            />
        </template>

        <!-- Render file field -->
        <template v-else-if="field.type === 'file'">
            <UiFormFieldsFile
                v-model="formData[field.id]"
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-valid="isValid"
            />
        </template>

        <!-- Render field groups + child fields, nesting subsequent groups with padding -->
        <template v-else-if="field.type === 'field-group'">
            <legend>{{ field.label }}</legend>
            <small>{{ field.description }}</small>

            <hr>

            <div :class="'pl-' + ((level + 1) * 2)">
                <UiFormFormField
                    v-for="child in field.children"
                    :key="child.id"
                    :event-bus="eventBus"
                    :field="child"
                    :form-data="formData"
                    :form-state="formState"
                    :level="level + 1"
                    :show-optional-fields="showOptionalFields"
                    @dataChange="onDataChange"
                />
            </div>
        </template>

        <!-- Render multi select field -->
        <template v-else-if="field.type === 'multi-select'">
            <UiFormFieldsMultiSelect
                v-model="formData[field.id]"
                :allow-adding-options="formComponentOptions.allowAddingOptions"
                :event-bus="eventBus"
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-valid="isValid"
                :no-options-message="noOptionsMessage"
            />
        </template>

        <!-- Render radio field -->
        <template v-else-if="field.type === 'radio'">
            <UiFormFieldsRadio
                v-model="formData[field.id]"
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-unique="isUnique"
                :is-valid="isValid"
            />
        </template>

        <!-- Render single select field -->
        <template v-else-if="field.type === 'single-select'">
            <UiFormFieldsSingleSelect
                v-model="formData[field.id]"
                :allow-adding-options="formComponentOptions.allowAddingOptions"
                :event-bus="eventBus"
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-valid="isValid"
                :no-options-message="noOptionsMessage"
            />
        </template>

        <!-- Render text area field -->
        <template v-else-if="field.type === 'text-area'">
            <UiFormFieldsTextArea
                v-model="formData[field.id]"
                :field="field"
                :field-state="fieldState"
                :input-debounce-time="formComponentOptions.inputDebounceTime"
                :is-required="isRequired"
                :is-valid="isValid"
            />
        </template>

        <!-- Render date field -->
        <template v-else-if="field.type === 'date' || field.type === 'date-time'">
            <UiFormFieldsDate
                v-model="formData[field.id]"
                :field="field"
                :field-state="fieldState"
                :is-required="isRequired"
                :is-time-included="field.type === 'date-time'"
                :is-valid="isValid"
            />
        </template>

        <!-- Render email, url, password, integer, long, decimal, and text fields -->
        <template v-else>
            <UiFormFieldsTyped
                v-model="formData[field.id]"
                :field="field"
                :field-state="fieldState"
                :input-debounce-time="formComponentOptions.inputDebounceTime"
                :is-required="isRequired"
                :is-unique="isUnique"
                :is-valid="isValid"
            />
        </template>
    </fieldset>
</component>