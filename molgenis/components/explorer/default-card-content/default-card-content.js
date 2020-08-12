import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronUp, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'


library.add(faSearch, faChevronRight, faChevronUp, faEdit, faTrash)

export default {
    components: { FontAwesomeIcon },
    computed: {
        dataToShow() {
            if (this.cardState === 'closed') {
                const elementsToShow = Object.keys(this.dataContents).slice(0, this.collapseLimit)
                return elementsToShow.reduce((accumulator, key) => {
                    accumulator[key] = this.dataContents[key]
                    return accumulator
                }, {})
            } else {
                return this.dataContents
            }
        },
        detailLink() {
            return `/menu/main/dataexplorer/details/${this.dataTable}/${this.dataId}`
        },
        expandBtnText() {
            return this.cardState === 'closed' ? 'Expand' : 'Collapse'
        },
    },
    data: () => {
        return {
            cardState: 'closed',
        }
    },


    methods: {
        goToDetails() {
            window.location.assign(this.detailLink)
        },
        handleExpandBtnClicked() {
            if (this.cardState === 'closed') {
                this.cardState = 'open'
                this.$emit('expandDefaultCard')
            } else {
                this.cardState = 'closed'
            }
        },
    },
    name: 'DefaultCardContent',
    props: {
        collapseLimit: {
            default: () => 5,
            type: Number,
        },
        dataContents: {
            required: true,
            type: Object,
        },
        dataId: {
            required: true,
            type: String,
        },
        dataLabel: {
            required: true,
            type: String,
        },
        dataTable: {
            required: true,
            type: String,
        },

        numberOfAttributes: {
            required: true,
            type: Number,
        },
    },
}