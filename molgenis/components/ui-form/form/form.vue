<component>
    <vue-form :id="id" :state="formState">
        <div class="text-right hide-option-fields-btn-container" v-if="options.showEyeButton">
            <button
                :title="eyeMessage" @click="toggleOptionalFields"
                class="btn btn-sm btn-outline-secondary toggle-btn"
                type="button"
            >
                <i :class="{'fa-eye-slash': showOptionalFields, 'fa-eye': !showOptionalFields}" class="fa show-fields-icon" />
            </button>
        </div>

        <template v-for="field in formFields">
            <form-field-component
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
    </vue-form>
</component>