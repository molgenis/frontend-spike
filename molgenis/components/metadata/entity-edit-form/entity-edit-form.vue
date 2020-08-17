<component>
    <div>
        <div class="row">
            <!-- Column containing  Entity ID, Extends, Extended by, Abstract-->
            <div class="col-md-4 col-sm-12 col-xs-12 inner-column">
                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-extends-label' | i18n
                        }}</label>
                    <div class="col">
                        <multiselect
                            :options="abstractEntities" :placeholder="$t('entity-edit-form-extends-placeholder')"
                            deselect-label=""
                            label="label" select-label=""
                            v-model="entityTypeParent"
                        />
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-4 text-muted">
                        <label for="abstractCheckbox">{{ 'entity-edit-form-abstract-label' | i18n
                        }}</label>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input
                                id="abstractCheckbox" v-model="abstract0"
                                class="form-check-input position-static"
                                type="checkbox"
                            >
                        </div>
                    </div>
                </div>

                <div class="form-group-row float-right">
                    <save-button :disabled="!isEntityTypeEdited" :on-click="saveEntityType">
                        {{ 'save-changes-button' | i18n }}
                    </save-button>
                    <button
                        class="btn btn-warning" :disabled="!isEntityTypeEdited"
                        @click="resetEntityType(editorEntityType.id)"
                    >
                        {{ 'undo-changes-button' | i18n }}
                    </button>
                    <button
                        class="btn btn-danger" :disabled="editorEntityType.isNew"
                        @click="deleteEntityType(editorEntityType.id)"
                    >
                        {{ 'delete-entity-button' | i18n }}
                    </button>
                </div>
            </div>

            <!-- Column containing: Label, Description and Package -->
            <div class="col-md-4 col-sm-12 col-xs-12 inner-column">
                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-label-label' | i18n
                    }}</label>
                    <div class="col input-group">
                        <input
                            v-model="label" class="form-control"
                            :placeholder="$t('entity-edit-form-label-placeholder')"
                            type="text"
                        >
                        <div class="input-group-append" style="z-index: -1;">
                            <!-- -1, because otherwise append overlaps entity type dropdown -->
                            <button aria-label="translate labels" class="btn btn-outline-secondary" @click="showLabelLanguageInputs = !showLabelLanguageInputs">
                                <i
                                    aria-hidden="true" class="fa fa-language fa-lg"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    v-for="languageCode in languageCodes" v-if="showLabelLanguageInputs"
                    class="form-group row"
                >
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-label-label' | i18n
                    }} ({{ languageCode }})</label>
                    <div class="col">
                        <input
                            class="form-control"
                            :placeholder="$t('entity-edit-form-label-placeholder')" type="text"
                            :value="labelI18n[languageCode]"
                            @input="updateLabelI18n(languageCode, $event.target.value)"
                        >
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-description-label' |
                        i18n }}</label>
                    <div class="col input-group">
                        <input
                            v-model="description" class="form-control"
                            :placeholder="$t('entity-edit-form-description-placeholder')"
                            type="text"
                        >
                        <div class="input-group-append" style="z-index: -1;">
                            <!-- -1, because otherwise append overlaps entity type dropdown -->
                            <button aria-label="translate descriptions" class="btn btn-outline-secondary" @click="showDescriptionLanguageInputs = !showDescriptionLanguageInputs">
                                <i
                                    aria-hidden="true" class="fa fa-language fa-lg"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    v-for="languageCode in languageCodes" v-if="showDescriptionLanguageInputs"
                    class="form-group row"
                >
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-description-label' | i18n
                    }} ({{ languageCode }})</label>
                    <div class="col">
                        <input
                            class="form-control"
                            :placeholder="$t('entity-edit-form-description-placeholder')" type="text"
                            :value="descriptionI18n[languageCode]"
                            @input="updateDescriptionI18n(languageCode, $event.target.value)"
                        >
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-package-label' | i18n
                    }}</label>
                    <div class="col">
                        <multiselect
                            v-model="package0" deselect-label=""
                            label="label"
                            :options="packages" :placeholder="$t('entity-edit-form-package-placeholder')"
                            select-label=""
                        />
                    </div>
                </div>
            </div>

            <!-- Column containing ID attribute, Label attribute and LookupAttributes -->
            <div class="col-md-4 col-sm-12 col-xs-12 outer-column">
                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-id-attribute-label' |
                        i18n }}</label>
                    <div class="col">
                        <multiselect
                            v-model="idAttribute" deselect-label=""
                            :disabled="entityTypeParent !== undefined || !editorEntityType.isNew"
                            label="label" :options="attributes"
                            :placeholder="$t('entity-edit-form-id-attribute-placeholder')"
                            select-label=""
                        />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{ 'entity-edit-form-label-attribute-label'
                        | i18n }}</label>
                    <div class="col">
                        <multiselect
                            v-model="labelAttribute" deselect-label=""
                            label="label"
                            :options="attributes" :placeholder="$t('entity-edit-form-label-attribute-placeholder')"
                            select-label=""
                        />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-4 col-form-label text-muted">{{
                        'entity-edit-form-lookup-attributes-label' | i18n }}</label>
                    <div class="col">
                        <multiselect
                            v-model="lookupAttributes"
                            deselect-label=""
                            label="label"
                            multiple
                            :options="attributes"
                            :placeholder="$t('entity-edit-form-lookup-attributes-placeholder')"
                            select-label="" track-by="id"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</component>