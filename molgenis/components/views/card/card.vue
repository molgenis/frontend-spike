<component>
    <div class="card-deck mx-n2">
        <explorer-card
            :collapse-limit="tableSettings.collapseLimit"
            :custom-code="tableSettings.customCardCode"
            :data-contents="entity"
            :data-id="getEntityId(entity)"
            :data-label="getEntityLabel(entity)"
            :data-table="tableName"
            :is-selected="isSelected(entity)"
            :is-shop="tableSettings.isShop"
            :key="index"
            :number-of-attributes="numberOfAttributes"
            @expand-card="handleExpandCard(entity)"
            v-for="(entity, index) in entitiesToShow"
        />
    </div>
</component>
