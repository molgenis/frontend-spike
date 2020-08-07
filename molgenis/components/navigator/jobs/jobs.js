import { mapState } from 'vuex'
import { REMOVE_JOB } from '@/store/mutations/navigator'

export default {
    name: 'Jobs',
    computed: {
        ...mapState('navigator', ['jobs']),
    },
    methods: {
        getVariant: function(job) {
            let variant
            switch (job.status) {
            case 'RUNNING':
                variant = 'info'
                break
            case 'SUCCESS':
                variant = 'success'
                break
            case 'FAILED':
                variant = 'danger'
                break
            default:
                throw new Error('unexpected job status ' + job.status)
            }
            return variant
        },
        getIcon: function(job) {
            let icon
            switch (job.status) {
            case 'RUNNING':
                icon = 'hourglass'
                break
            case 'SUCCESS':
                icon = 'check-circle'
                break
            case 'FAILED':
                icon = 'times-circle'
                break
            default:
                throw new Error('unexpected job status ' + job.status)
            }
            return icon
        },
        removeJob: function(job) {
            this.$store.commit('navigator/' + REMOVE_JOB, job)
        },
        showProgress: function(job) {
            return job.status === 'RUNNING' && job.progress && job.progressMax
        },
    },
}