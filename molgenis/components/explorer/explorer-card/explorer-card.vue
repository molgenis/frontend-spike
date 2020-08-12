<component>
    <div class="card mg-explorer-card m-2 position-relative overflow-hidden">
        <div class="card-body">
            <slot>
                <custom-card-content
                    :custom-code="customCode"
                    :id="dataId"
                    :record="dataContents"
                    v-if="customCode"
                >
                    <template v-slot:shopping-button>
                        <shopping-button :id="dataId" :is-selected="isSelected" v-if="isShop" />
                    </template>
                </custom-card-content>
                <default-card-content
                    v-else
                    :collapse-limit="collapseLimit"
                    :data-contents="dataContents"
                    :data-id="dataId"
                    :data-label="dataLabel"
                    :data-table="dataTable"
                    :expand-default-card="handleDefaultCardExpand"
                    :number-of-attributes="numberOfAttributes"
                >
                    <template v-slot:shopping-button>
                        <shopping-button v-if="isShop" :id="dataId" :is-selected="isSelected" />
                    </template>
                </default-card-content>
            </slot>
        </div>
    </div>
</component>
