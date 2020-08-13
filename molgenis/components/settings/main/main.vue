<component class="c-settings-main container">
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

    <h2>Molgenis settings</h2>
    <hr>

    <div class="row">
        <div class="col-md-12">
            <select v-model="selectedSetting" class="form-control">
                <option v-for="option in settingsOptions" :key="option.id" :value="option.id">
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>

    <div v-if="showForm">
        <UiFormForm
            id="settings-form"
            :form-fields="formFields"
            :form-state="formState"
            :initial-form-data="formData"
            @valueChange="onValueChanged"
        />
    </div>
    <div v-else class="">
        <i class="fa fa-spinner fa-spin fa-3x" />
    </div>

    <div aria-label="row actions" class="btn-group" role="group">
        <button
            v-if="!isSaving"
            id="save-btn-top"
            class="btn btn-primary"
            type="submit"
            @click.prevent="onSubmit"
        >
            Save changes
        </button>

        <button
            v-else
            id="save-btn-saving"
            class="btn btn-primary"
            disabled="disabled"
            type="button"
        >
            Saving.... <i class="fa fa-spinner fa-spin " />
        </button>
    </div>
</component>
