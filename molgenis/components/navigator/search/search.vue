<component>
    <div class="row">
        <div class="col-md-6">
            <b-input-group>
                <b-form-input
                    :placeholder="$t('search in packages')"
                    type="text"
                    v-model="query"
                />
                <b-input-group-append>
                    <b-btn variant="primary">
                        <Icon icon="search" />
                        {{ $t('search') }}
                    </b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</component>
