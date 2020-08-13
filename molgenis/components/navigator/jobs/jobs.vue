<component>
    <div class="fixed-bottom job-alerts">
        <div
            class="row"
            v-if="jobs.length > 0"
        >
            <div class="col">
                <div
                    :key="job.id"
                    v-for="job in jobs"
                >
                    <b-alert
                        :dismissible="job.status !== 'RUNNING'"
                        :variant="getVariant(job)"
                        @dismissed="removeJob(job)"
                        show
                    >
                        <div class="row">
                            <div class="col-1">
                                <Icon :icon="['far', getIcon(job)]" />
                            </div>
                            <div class="col-11">
                                <span v-if="job.progressMessage">{{ job.progressMessage }}</span>
                                <span v-if="showProgress(job)">{{ job.progress }}/{{ job.progressMax }}</span>
                                <span v-if="job.type === 'DOWNLOAD' && job.status === 'SUCCESS'">
                                    <br>
                                    <span>{{ 'progress-download-success-action-pre' | i18n }}</span>
                                    <a
                                        class="alert-link"
                                        download
                                        :href="job.resultUrl"
                                    >{{ 'progress-download-success-action' | i18n }}</a>
                                    <span>{{ 'progress-download-success-action-post' | i18n }}</span>
                                </span>
                            </div>
                        </div>
                    </b-alert>
                </div>
            </div>
        </div>
    </div>
</component>
