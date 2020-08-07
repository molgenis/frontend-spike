<component>
    <span>
        <div
            :title="$t('action-upload')"
            class="btn-tooltip-wrapper"
            v-b-tooltip.d500
        >
            <b-btn
                :disabled="!canUpload"
                :href="importWizardUrl + (folder ? '?selectedPackage=' + folder.id : '')"
                variant="secondary"
            >
                <font-awesome-icon
                    :class="{'fa-disabled' : !canUpload}"
                    icon="upload"
                    size="lg"
                />
            </b-btn>
        </div>&nbsp;
        <div
            v-b-tooltip.d500
            class="btn-tooltip-wrapper"
            :title="$t('action-download')"
        >
            <b-btn
                :disabled="!canDownload"
                variant="secondary"
                @click="downloadSelectedResources"
            >
                <font-awesome-icon
                    :class="{'fa-disabled' : !canDownload}"
                    icon="download"
                    size="lg"
                />
            </b-btn>
        </div>&nbsp;
    </span>
</component>
