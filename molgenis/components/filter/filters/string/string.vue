<component>
    <b-input-group>
        <b-form-input
            :name="name"
            :placeholder="placeholder"
            trim
            v-model="model"
        />
        <b-input-group-append>
            <b-button
                variant="outline-secondary"
                @click.prevent="model=''"
            >
                <Icon icon="times" />
            </b-button>
        </b-input-group-append>
    </b-input-group>
</component>
