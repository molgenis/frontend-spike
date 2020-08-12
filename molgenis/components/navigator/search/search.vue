<component>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <b-input-group>
                <b-form-input
                    :placeholder="$t('search-input-placeholder')"
                    type="text"
                    v-model="query"
                />
                <b-input-group-append>
                    <b-btn variant="secondary">
                        <font-awesome-icon icon="search" />
                    </b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</component>
