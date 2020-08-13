<component class="default-card-content">
    <div>
        <h5 class="card-title mg-default-card-title">
            {{dataLabel}}
            <router-link :to="{name: 'data-row-edit', params: {dataTableId: dataTable, dataRowId: dataId}}" class="btn btn-link ml-1">
                <Icon icon="edit" />
            </router-link>
            <button
                class="btn btn-link"
                role="button"
                @click="$eventBus.$emit('delete-item', dataId)"
            >
                <Icon icon="trash" />
            </button>
            <slot name="shopping-button" />
        </h5>
        <div class="card-text">
            <div v-for="(value, head) in dataToShow" :key="head" class="row mb-1">
                <div class="col-3 description">
                    {{ head }}
                </div>
                <div class="col-9">
                    {{ value }}
                </div>
            </div>
            <div class="row">
                <div class="col mt-2">
                    <button v-if="numberOfAttributes > collapseLimit" class="btn btn-outline-info mr-1 mg-card-expand" @click="handleExpandBtnClicked">
                        <Icon v-if="cardState==='open'" icon="chevron-up" />
                        <Icon v-if="cardState==='closed'" icon="chevron-right" /> {{ expandBtnText }}
                    </button>
                    <button class="btn btn-outline-info btn-sm mg-info-btn" @click="goToDetails">
                        <Icon icon="search" /> Info
                    </button>
                </div>
            </div>
        </div>
    </div>
</component>