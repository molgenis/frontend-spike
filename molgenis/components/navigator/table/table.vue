<component>
    <div class="table-container">
        <b-table
            :empty-text="$t('table-no-results')" :fields="fields"
            :filter="filter" :items="tableResources"
            class="text-left"
            show-empty
        >
            <template slot="HEAD_selected">
                <b-form-checkbox
                    :checked="isAllSelected()"
                    :class="tableResources.length == 0 ? 'invisible' : ''"
                    @change="toggleAllSelected"
                    @click.native.stop
                >
                    <!-- workaround for https://github.com/twbs/bootstrap/issues/26221 -->
                    <span class="text-hide">placeholder</span>
                </b-form-checkbox>
            </template>
            <template
                slot="selected"
                slot-scope="row"
            >
                <b-form-checkbox
                    :checked="isSelected(row.item)"
                    @change="toggleSelected(row.item, $event)"
                    @click.native.stop
                >
                    <!-- workaround for https://github.com/twbs/bootstrap/issues/26221 -->
                    <span class="text-hide">placeholder</span>
                </b-form-checkbox>
            </template>
            <template
                slot="label"
                slot-scope="label"
            >
                <span v-if="label.item.type === 'ENTITY_TYPE'">
                    <router-link :to="{name: 'explorer-entity', params: {entity: label.item.id}}">
                        <font-awesome-icon
                            fixed-width
                            icon="list"
                        /> {{ label.item.label }}
                    </router-link>
                </span>
                <span v-else-if="label.item.type === 'ENTITY_TYPE' || label.item.type === 'ENTITY_TYPE_ABSTRACT'">
                    <font-awesome-icon
                        fixed-width
                        icon="list"
                    /> {{ label.item.label }}
                </span>
                <span v-else>
                    <router-link :to="{name: 'navigator-folder', params: {folderId: label.item.id}}">
                        <font-awesome-icon
                            fixed-width
                            :icon="['far', 'folder-open']"
                        /> {{ label.item.label }}
                    </router-link>
                </span>
            </template>
        </b-table>
    </div>
</component>

