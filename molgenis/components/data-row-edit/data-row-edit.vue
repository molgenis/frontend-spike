
<component class="container">
    <!-- Alert container -->
    <div class="row">
        <div class="col-md-12">
            <div
                id="alert-message" :class="'alert alert-' + alert.type"
                role="alert"
                v-if="alert"
            >
                <button @click="clearAlert()" class="close" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
                <span id="message-span">{{alert.message}}</span>
            </div>
        </div>
    </div>

    <div v-if="showForm">
        <h1>{{dataTableLabel}}</h1>

        <form-component
            id="data-row-edit-form"
            -value-change="onValueChanged"
            :form-fields="formFields"
            :form-state="formState"
            :initial-form-data="formData"
        />

        <div class="row">
            <div class="col-md-12">
                <button
                    id="cancel-btn"
                    class="btn btn-secondary"
                    @click.prevent="goBackToPluginCaller"
                >
                    {{ 'data-row-edit-cancel-button-label' | i18n }}
                </button>

                <button
                    v-if="!isSaving"
                    id="save-btn"
                    class="btn btn-primary"
                    :disabled="formState.$invalid && formState.$touched"
                    type="submit"
                    @click.prevent="onSubmit"
                >
                    {{ 'data-row-edit-save-button-label' | i18n }}
                </button>

                <button
                    v-else
                    id="save-btn-saving"
                    class="btn btn-primary"
                    disabled="disabled"
                    type="button"
                >
                    {{ 'data-row-edit-save-busy-state-label' | i18n }} <i
                        aria-hidden="true" class="fa fa-spinner fa-spin "
                    />
                </button>

                <span
                    v-if="!isSaving && formState.$invalid && formState.$touched"
                    class="alert text-danger"
                >
                    {{ 'data-row-edit-invalid-fields-msg' | i18n }}
                </span>
            </div>
        </div>
    </div>
    <div v-else class="">
        <i aria-hidden="true" class="fa fa-spinner fa-spin fa-3x" />
    </div>

    </div>
</component>