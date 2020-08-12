<component class="default-card-content">
    <div>
        <h5 class="card-title mg-default-card-title">
            {{dataLabel}}
            <router-link :to="{name: 'data-row-edit', params: {dataTableId: dataTable, dataRowId: dataId}}" class="btn btn-sm btn-link ml-1">
                <font-awesome-icon icon="edit" />
            </router-link>
            <button
                class="btn btn-sm btn-link"
                role="button"
                @click="$eventBus.$emit('delete-item', dataId)"
            >
                <font-awesome-icon icon="trash" />
            </button>
            <slot name="shopping-button" />
        </h5>
        <div class="card-text">
            <div v-for="(value, head) in dataToShow" :key="head" class="row mb-1">
                <div class="col-6">
                    {{ head }}
                </div>
                <div class="col-6">
                    {{ value }}
                </div>
            </div>
            <div class="row">
                <div class="col mt-2">
                    <button v-if="numberOfAttributes > collapseLimit" class="btn btn-outline-info btn-sm mr-1 mg-card-expand" @click="handleExpandBtnClicked">
                        <font-awesome-icon v-if="cardState==='open'" icon="chevron-up" />
                        <font-awesome-icon v-if="cardState==='closed'" icon="chevron-right" /> {{ expandBtnText }}
                    </button>
                    <button class="btn btn-outline-info btn-sm mg-info-btn" @click="goToDetails">
                        <font-awesome-icon icon="search" /> Info
                    </button>
                </div>
            </div>
        </div>
    </div>
</component>