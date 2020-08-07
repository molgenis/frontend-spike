import { mapState } from 'vuex'
import {DESELECT_ALL_RESOURCES, DESELECT_RESOURCE, SELECT_ALL_RESOURCES, SELECT_RESOURCE} from '@molgenis/molgenis/store/actions/navigator.js'

export default {

    computed: {
        ...mapState('navigator', ['resources', 'selectedResources', 'showHiddenResources', 'clipboard']),
        ...mapState({legacy: state => state.settings.legacy}),
        nrResources() {
            return this.resources.filter(resource => this.showHiddenResources || !resource.hidden).length
        },
        nrSelectedResources() {
            return Object.keys(this.selectedResources).length
        },
        tableResources() {
            return this.resources.filter(resource => this.showHiddenResources || !resource.hidden).map(
                resource => Object.assign({}, resource)).sort((a, b) => {
                if (a.type === 'PACKAGE' && b.type !== 'PACKAGE') {
                    return -1
                } else if (b.type === 'PACKAGE' && a.type !== 'PACKAGE') {
                    return 1
                } else {
                    return a.label.localeCompare(b.label)
                }
            })
        },
    },
    data() {
        return {
            allSelected: false,
            dataExplorerUrl: window.__INITIAL_STATE__.pluginUrls['dataexplorer'],
            fields: {
                description: {
                    class: 'd-none d-md-table-cell',
                    label: this.$t('table-col-header-description'),
                    sortable: false,
                    tdClass: this.cellClass,
                },
                label: {
                    class: 'text-nowrap',
                    label: this.$t('table-col-header-name'),
                    sortable: true,
                    tdClass: this.cellClass,
                },
                selected: {
                    'class': 'compact align-middle',
                    tdClass: this.cellClass,
                },
            },
            filter: null,
        }
    },
    methods: {
        cellClass: function(value, key, resource) {
            return this.isClipboardResource(resource) ? 'bg-warning' : ''
        },
        isAllSelected: function() {
            return this.nrResources > 0 && this.nrResources === this.nrSelectedResources
        },
        isClipboardResource: function(resource) {
            return this.clipboard && this.clipboard.resources && this.clipboard.resources.some(
                clipboardResource => clipboardResource.type === resource.type && clipboardResource.id === resource.id)
        },
        isSelected: function(resource) {
            return this.selectedResources.some(selectedResource => selectedResource.type === resource.type && selectedResource.id === resource.id)
        },
        toggleAllSelected: function(checked) {
            if (checked) {
                this.$store.dispatch('navigator/' + SELECT_ALL_RESOURCES)
            } else {
                this.$store.dispatch('navigator/' + DESELECT_ALL_RESOURCES)
            }
        },
        toggleSelected: function(resource, checked) {
            if (checked) {
                this.$store.dispatch('navigator/' + SELECT_RESOURCE, resource)
                this.allSelected = this.nrResources === this.nrSelectedResources
            } else {
                this.$store.dispatch('navigator/' + DESELECT_RESOURCE, resource)
                this.allSelected = false
            }
        },
    },
    name: 'NavigatorTable',
    watch: {
        '$route'() {
            this.allSelected = false
        },
    },

}