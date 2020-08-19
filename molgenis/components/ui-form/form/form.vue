<component>
    <VueForm :id="id" :state="formState">
        <div class="text-right hide-option-fields-btn-container" v-if="options.showEyeButton">
            <button
                :title="eyeMessage" @click="toggleOptionalFields"
                class="btn btn-sm btn-outline-secondary toggle-btn"
                type="button"
            >
                <Icon :icon="showOptionalFields ? 'eye' : 'eye-slash'" />
            </button>
        </div>

        <template v-for="field in formFields">
            <UiFormFormField
                :key="field.id"
                class="mg-ui-form-field"
                :event-bus="eventBus"
                :field="field"
                :form-component-options="options"
                :form-data="formData"
                :form-state="formState"
                :show-optional-fields="showOptionalFields"
                @data-change="handleValueChange(formData)"
            />
        </template>
    </VueForm>
</component>