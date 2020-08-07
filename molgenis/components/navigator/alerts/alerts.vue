<component>
    <div
        class="row"
        v-if="alerts.length > 0"
    >
        <div class="col">
            <div
                :key="index" v-for="(alert, index) in alerts"
            >
                <b-alert
                    :variant="getVariant(alert)"
                    @dismissed.prevent="removeAlert(index)"
                    dismissible
                    show
                >
                    <span>{{ alert.message }}</span>
                    <span v-if="alert.code"> ({{ alert.code }})</span>
                </b-alert>
            </div>
        </div>
    </div>
</component>
