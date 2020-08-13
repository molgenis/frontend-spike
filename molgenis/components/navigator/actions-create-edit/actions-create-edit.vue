<component>
    <span>
        <div
            :title="$t('action-create')"
            class="btn-tooltip-wrapper"
            v-b-tooltip.d500
        >
            <b-dd
                :disabled="!canCreate"
                variant="primary"
            >
                <template slot="button-content">
                    <Icon
                        :class="{'fa-disabled' : !canCreate}"
                        icon="plus"
                        size="lg"
                    />
                </template>
                <b-dd-item v-b-modal.packageCreateModal>
                    <Icon :icon="['far', 'folder-open']" /> {{ 'action-create-package' | i18n }}
                </b-dd-item>
                <b-dd-item
                    v-if="metadataManagerUrl"
                    :href="metadataManagerUrl"
                >
                    <Icon icon="list" /> {{ 'action-create-entity-type' | i18n }}
                </b-dd-item>
            </b-dd>
        </div>&nbsp;
        <div
            v-b-tooltip.d500
            class="btn-tooltip-wrapper"
            :title="$t('action-edit')"
        >
            <b-btn
                v-if="nrSelectedResources === 1 && getSelectedResourceType === 'PACKAGE'"
                v-b-modal.packageUpdateModal
                class="button-last"
                :disabled="!canEdit"
                variant="secondary"
            >
                <Icon
                    :class="{'fa-disabled' : !canEdit}"
                    icon="edit"
                    size="lg"
                />
            </b-btn>
            <b-btn
                v-else-if="metadataManagerUrl && nrSelectedResources === 1 && (getSelectedResourceType === 'ENTITY_TYPE' || getSelectedResourceType === 'ENTITY_TYPE_ABSTRACT')"
                class="button-last"
                :disabled="!canEdit"
                :href="metadataManagerUrl + '/' + selectedResources[0].id"
                variant="secondary"
            >
                <Icon
                    :class="{'fa-disabled' : !canEdit}"
                    icon="edit"
                    size="lg"
                />
            </b-btn>
            <b-btn
                v-else
                class="button-last"
                :disabled="true"
                variant="secondary"
            >
                <Icon
                    :class="{'fa-disabled' : !canEdit}"
                    icon="edit"
                    size="lg"
                />
            </b-btn>
        </div>&nbsp;
    </span>
</component>
