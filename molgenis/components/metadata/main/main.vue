<component>
    <div>
        <div class="row">
            <div class="col">
                <MetadataHeader />
                <hr>
            </div>
        </div>
        <div v-if="loading" class="row">
            <div class="col">
                <div class="row">
                    <MetadataSpinner />
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col">
                    <div v-if="editorEntityType && editorEntityType.id !== ''">
                        <MetadataEntityEditForm />
                        <hr>
                    </div>
                    <h4 v-else class="text-muted text-center">
                        {{ 'no-entity-type-selected-text' | i18n }}
                    </h4>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <MetadataAttributeEditForm
                        v-if="editorEntityType && editorEntityType.id !== ''"
                    />
                </div>
            </div>
        </div>
    </div>
</component>