<component>
    <b-modal
        id="resourceDeleteModal"
        :cancel-title="$t('delete-confirmation-cancel-text')"
        :ok-title="$t('delete-confirmation-ok-text')"
        :title="$t('delete-confirmation-title')"
        @ok="deleteSelectedResources"
        cancel-variant="secondary"
        ok-variant="danger"
    >
        {{ 'delete-confirmation-text' | i18n }}
    </b-modal>
</component>
