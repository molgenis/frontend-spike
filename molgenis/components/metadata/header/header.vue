<component>
    <div class="row">
        <div class="col-md-4 col-sm-12 col-xs-12">
            <h2>{{ 'application-title' | i18n }}</h2>
        </div>

        <div class="col-md-4 col-sm-10 col-xs-10">
            <multiselect
                :options="entityTypes" :placeholder="$t('header-entity-select-placeholder')"
                deselect-label=""
                label="label" select-label=""
                v-model="selectedEntityType"
            />
        </div>

        <div class="col-md-4 col-sm-2 col-xs-2">
            <button aria-label="create new entity type" class="btn btn-primary" @click="createNewEntityType">
                <i aria-hidden="true" class="fa fa-plus" />
            </button>
        </div>
    </div>
</component>