<component>
  <div class="card mg-explorer-card m-2 position-relative overflow-hidden">
    <div class="card-body">
      <slot>
        <custom-card-content v-if="customCode"
                             :id="dataId"
                             :customCode="customCode"
                             :record="dataContents"
        >
          <template v-slot:shopping-button>
            <shopping-button :id="dataId" v-if="isShop" :isSelected="isSelected"></shopping-button>
          </template>
        </custom-card-content>
        <default-card-content v-else
                              :dataId="dataId"
                              :dataTable="dataTable"
                              :dataLabel="dataLabel"
                              :dataContents="dataContents"
                              :collapseLimit="collapseLimit"
                              :numberOfAttributes="numberOfAttributes"
                              @expandDefaultCard="handleDefaultCardExpand"
        >
          <template v-slot:shopping-button>
            <shopping-button :id="dataId" v-if="isShop" :isSelected="isSelected"></shopping-button>
          </template>
        </default-card-content>
      </slot>
    </div>
  </div>
</component>
