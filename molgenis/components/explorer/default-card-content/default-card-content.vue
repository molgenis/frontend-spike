<component class="default-card-content">
  <div>
    <h5 class="card-title mg-default-card-title">{{dataLabel}}
      <a
        class="btn btn-sm btn-link ml-1"
        role="button"
        :href="'/plugin/data-row-edit/' + dataTable + '/' + dataId">
        <font-awesome-icon icon="edit"></font-awesome-icon>
      </a>
      <button
        class="btn btn-sm btn-link"
        role="button"
        @click="$eventBus.$emit('delete-item', dataId)"
        >
        <font-awesome-icon icon="trash"></font-awesome-icon>
      </button>
      <slot name="shopping-button"></slot>
    </h5>
    <div class="card-text">
      <div class="row mb-1" v-for="(value, head) in dataToShow" :key="head">
        <div class="col-6">
          {{head}}
        </div>
        <div class="col-6">
          {{value}}
        </div>
      </div>
      <div class="row">
        <div class="col mt-2">
          <button v-if="numberOfAttributes > collapseLimit" class="btn btn-outline-info btn-sm mr-1 mg-card-expand" @click="handleExpandBtnClicked">
            <font-awesome-icon icon="chevron-up" v-if="cardState==='open'"></font-awesome-icon>
            <font-awesome-icon icon="chevron-right" v-if="cardState==='closed'"></font-awesome-icon> {{ expandBtnText }}
          </button>
          <button class="btn btn-outline-info btn-sm mg-info-btn" @click="goToDetails">
            <font-awesome-icon icon="search"></font-awesome-icon> Info
          </button>
        </div>
      </div>
    </div>
  </div>
</component>