<component>
    <div class="row">
        <!-- Attribute tree -->
        <div class="col-md-3 attribute-tree">
            <div class="row">
                <div class="col">
                    <strong>{{ 'attribute-tree-title' | i18n }}</strong>
                    <button @click="addAttribute" aria-label="add attribute" class="btn btn-primary btn-sm float-right">
                        <i
                            aria-hidden="true" class="fa fa-plus"
                        />
                    </button>
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col">
                    <div
                        :aria-label="$t('button-group-aria-label')" class="btn-toolbar float-right"
                        role="toolbar"
                    >
                        <div class="btn-group mr-2" role="group">
                            <button
                                aria-label="move up" class="btn btn-secondary btn-sm"
                                :disabled="!selectedAttribute || selectedAttributeIndex === 0" @click="moveAttribute('up')"
                            >
                                <i aria-hidden="true" class="fa fa-chevron-up" />
                            </button>
                            <button
                                aria-label="move down" class="btn btn-secondary btn-sm"
                                :disabled="!selectedAttribute || selectedAttributeIndex === editorEntityType.attributes.length - 1" @click="moveAttribute('down')"
                            >
                                <i aria-hidden="true" class="fa fa-chevron-down" />
                            </button>
                        </div>
                        <div class="btn-group" role="group">
                            <button
                                aria-label="delete"
                                class="btn btn-danger float-right btn-sm"
                                :disabled="!selectedAttribute"
                                @click="deleteAttribute(selectedAttribute)"
                            >
                                <i aria-hidden="true" class="fa fa-trash-o" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MetadataAttributeTree
                :attribute-tree="attributeTree" :on-attribute-select="onAttributeSelect"
                :selected-attribute="selectedAttribute"
            />

            <p v-if="editorEntityType.entityTypeParent !== undefined">
                {{ 'compound-attribute-text' | i18n }}
                <strong>{{ editorEntityType.entityTypeParent.label }}:</strong><br>
                <span v-for="attribute in editorEntityType.entityTypeParent.attributes">- {{ attribute.label }} <br></span>
            </p>
        </div>

        <!-- Attribute form inputs -->
        <div v-if="!selectedAttribute" class="col-md-9">
            <div class="row">
                <div class="col">
                    <h4 class="text-muted text-center">
                        {{ 'no-attribute-selected-text' | i18n }}
                    </h4>
                </div>
            </div>
        </div>
        <div v-else class="col-md-9">
            <div class="row">
                <div class="col attribute-form-header">
                    <strong>{{ 'selected-attribute-label' | i18n }}:</strong> {{ selectedAttribute.label }}
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-name-label' |
                            i18n }}</label>
                        <div class="col">
                            <input
                                v-model="name" class="form-control"
                                :disabled="!selectedAttribute.isNew" :placeholder="$t('attribute-edit-form-name-placeholder')"
                                type="text"
                            >
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-label-label' |
                            i18n }}</label>
                        <div class="col input-group">
                            <input
                                v-model="label" class="form-control"
                                :placeholder="$t('attribute-edit-form-label-placeholder')"
                                type="text"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" @click="showLabelLanguageInputs = !showLabelLanguageInputs">
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
                        <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-label-label' | i18n
                        }} ({{ languageCode }})</label>
                        <div class="col">
                            <input
                                class="form-control"
                                :placeholder="$t('attribute-edit-form-label-placeholder')" type="text"
                                :value="labelI18n[languageCode]"
                                @input="updateLabelI18n(languageCode, $event.target.value)"
                            >
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{
                            'attribute-edit-form-description-label' | i18n }}</label>
                        <div class="col input-group">
                            <input
                                v-model="description" class="form-control"
                                :placeholder="$t('attribute-edit-form-description-placeholder')"
                                type="text"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" @click="showDescriptionLanguageInputs = !showDescriptionLanguageInputs">
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
                        <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-description-label' |
                            i18n
                        }} ({{ languageCode }})</label>
                        <div class="col">
                            <input
                                class="form-control"
                                :placeholder="$t('attribute-edit-form-description-placeholder')" type="text"
                                :value="descriptionI18n[languageCode]"
                                @input="updateDescriptionI18n(languageCode, $event.target.value)"
                            >
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-type-label' |
                            i18n }}</label>
                        <div class="col">
                            <MultiSelect
                                v-model="type" deselect-label=""
                                :options="attributeTypes" :placeholder="$t('attribute-edit-form-type-placeholder')"
                                select-label=""
                            />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-parent-label' |
                            i18n }}</label>
                        <div class="col">
                            <MultiSelect
                                v-model="parent" deselect-label=""
                                label="label"
                                :options="compoundAttributes" :placeholder="$t('attribute-edit-form-parent-placeholder')"
                                select-label=""
                            />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{
                            'attribute-edit-form-default-value-label' | i18n }}</label>
                        <div class="col">
                            <input
                                v-model="defaultValue" class="form-control"
                                :placeholder="$t('attribute-edit-form-default-value-placeholder')"
                                type="text"
                            >
                        </div>
                    </div>

                    <div v-if="isReferenceType" class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{
                            'attribute-edit-form-reference-entity-label' | i18n
                        }}</label>
                        <div class="col">
                            <MultiSelect
                                v-model="refEntityType" deselect-label=""
                                label="label"
                                :options="entityTypes" :placeholder="$t('attribute-edit-form-reference-entity-placeholder')"
                                select-label=""
                            />
                        </div>
                    </div>

                    <div v-if="isReferenceType" class="form-group row">
                        <div class="col-3 text-muted">
                            <label for="cascadeDeleteCheckbox">{{ 'attribute-edit-form-cascade-delete-label' | i18n }}</label>
                        </div>
                        <div class="col-9">
                            <div class="form-check">
                                <input
                                    id="cascadeDeleteCheckbox" v-model="cascadeDelete"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>

                    <div v-else-if="isNumericType">
                        <div class="form-group row">
                            <label class="col-3 col-form-label text-muted">{{
                                'attribute-edit-form-minimum-range-label' | i18n
                            }}</label>
                            <div class="col">
                                <input
                                    v-model.number="rangeMin" class="form-control"
                                    :placeholder="$t('attribute-edit-form-minimum-range-placeholder')"
                                    type="number"
                                >
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-3 col-form-label text-muted">{{
                                'attribute-edit-form-maximum-range-label' | i18n
                            }}</label>
                            <div class="col">
                                <input
                                    v-model.number="rangeMax" class="form-control"
                                    :placeholder="$t('attribute-edit-form-maximum-range-placeholder')"
                                    type="number"
                                >
                            </div>
                        </div>
                    </div>

                    <div v-else-if="isEnumType" class="form-group row">
                        <label class="col-3 col-form-label text-muted">{{
                            'attribute-edit-form-enum-options-label' | i18n }}</label>
                        <div class="col">
                            <input
                                v-model.lazy="enumOptions" class="form-control"
                                :placeholder="$t('attribute-edit-form-enum-options-placeholder')"
                                type="text"
                            >
                        </div>
                    </div>

                    <div v-if="isOneToManyType">
                        <div class="form-group row">
                            <label class="col-3 col-form-label text-muted">{{
                                'attribute-edit-form-mapped-by-label' | i18n }}</label>
                            <div class="col">
                                <MultiSelect
                                    v-model="mappedByAttribute" :custom-label="customOneToManyLabel"
                                    deselect-label=""
                                    :options="mappedByAttributes" :placeholder="$t('attribute-edit-form-mapped-by-placeholder')"
                                    select-label=""
                                />
                            </div>
                        </div>

                        <!-- TODO: make this editable -->
                        <div v-if="orderBy && orderBy.orders" class="form-group row">
                            <label class="col-3 col-form-label text-muted">{{ 'attribute-edit-form-order-by-label'
                                | i18n }}</label>
                            <div class="col">
                                <p class="form-control-static">
                                    <span v-for="o in orderBy.orders"> {{ o.attributeName }}
                                        <i
                                            aria-hidden="true"
                                            class="fa"
                                            :class="{'fa-sort-amount-asc': o.direction === 'ASC', 'fa-sort-amount-desc': o.direction === 'DESC'}"
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group row">
                        <div class="col-9 text-muted">
                            <label for="nullableCheckbox">{{ 'attribute-edit-form-nullable-label' | i18n }}</label>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <input
                                    id="nullableCheckbox" v-model="nullable"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-9 text-muted">
                            <label for="autoCheckbox">{{ 'attribute-edit-form-auto-label' | i18n }}</label>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <input
                                    id="autoCheckbox" v-model="auto"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-9 text-muted">
                            <label for="visibleCheckbox">{{ 'attribute-edit-form-visible-label' | i18n }}</label>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <input
                                    id="visibleCheckbox" v-model="visible"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group row">
                        <div class="col-9 text-muted">
                            <label for="uniqueCheckbox">{{ 'attribute-edit-form-unique-label' | i18n }}</label>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <input
                                    id="uniqueCheckbox" v-model="unique"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-9 text-muted">
                            <label for="readonlyCheckbox">{{ 'attribute-edit-form-readonly-label' | i18n }}</label>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <input
                                    id="readonlyCheckbox" v-model="readonly"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-9 text-muted">
                            <label for="aggregatableCheckbox">{{ 'attribute-edit-form-aggregatable-label' | i18n }}</label>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <input
                                    id="aggregatableCheckbox" v-model="aggregatable"
                                    class="form-check-input position-static"
                                    type="checkbox"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label class="text-muted">{{ 'attribute-edit-form-computed-expression-label' | i18n
                        }}</label>
                        <textarea
                            v-model="expression" class="form-control"
                            :placeholder="$t('attribute-edit-form-computed-expression-placeholder')"
                            rows="3"
                        />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label class="text-muted">{{ 'attribute-edit-form-nullable-expression-label' | i18n
                        }}</label>
                        <textarea
                            v-model="nullableExpression" class="form-control"
                            :placeholder="$t('attribute-edit-form-nullable-expression-placeholder')"
                            rows="3"
                        />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label class="text-muted">{{ 'attribute-edit-form-visible-expression-label' | i18n
                        }}</label>
                        <textarea
                            v-model="visibleExpression" class="form-control"
                            :placeholder="$t('attribute-edit-form-visible-expression-placeholder')"
                            rows="3"
                        />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label class="text-muted">{{ 'attribute-edit-form-validation-expression-label' | i18n
                        }}</label>
                        <textarea
                            v-model="validationExpression" class="form-control"
                            :placeholder="$t('attribute-edit-form-validation-expression-placeholder')"
                            rows="3"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</component>