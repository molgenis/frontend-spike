
<component>
    <b-input-group class="flex-nowrap">
        <date-range-picker
            ref="picker"
            :always-show-calendars="true"
            :auto-apply="false"
            :linked-calendars="false"
            :locale-data="{ firstDay: 1, format: 'yyyy-mm-dd HH:MM:ss' }"
            :max-date="max"
            :min-date="min"
            :opens="opens"
            :ranges="false"
            :show-dropdowns="true"
            :show-week-numbers="false"
            :single-date-picker="!range"
            :time-picker="time"
            :time-picker24hour="true"
            @update="updateValues"
            class="flex-grow-1"
            v-model="dateRange"
        >
            <template slot="input">
                {{ formattedDate }}
            </template>
        </date-range-picker>
        <b-input-group-append>
            <b-button
                @click="clearValue"
                class="t-btn-clear"
                variant="outline-secondary"
            >
                <font-awesome-icon icon="times" />
            </b-button>
        </b-input-group-append>
    </b-input-group>
</component>