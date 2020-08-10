import * as components from '../filters/index.js'
import AddFilterModal from '../add-filter-modal/add-filter-modal.js'
import draggable from 'vuedraggable'
import FilterCard from '../filter-card/filter-card.js'


export default {
    components: { AddFilterModal, draggable, FilterCard, ...components },
    computed: {
        doCollapse() {
            // Bootstrap's mobile collapse width
            return this.width <= 576
        },
        doDragDrop() {
            return this.canEdit && !this.doCollapse
        },
        listOfInvisibleFilters() {
            return this.filters.filter(filter => !this.filtersToShow.includes(filter.name))
        },
        listOfVisibleFilters() {
            return this.filtersToShow.map(id => this.filters.find(filter => filter.name === id)).filter(item => item !== undefined)
        },
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },
    data() {
        return {
            drag: false,
            filtersToShow: this.filtersShown,
            filterToAdd: null,
            mobileToggle: false,
            width: 0,
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.width = window.innerWidth
        },
        removeFilter(name) {
            this.filtersToShow = this.filtersToShow.filter(filter => name !== filter)
            this.$emit('update', this.filtersToShow)

            let selections = { ...this.value }
            delete selections[name]
            this.$emit('input', selections)
        },
        selectionChange(name, value) {
            this.$emit('input', { ...this.value, [name]: value })
        },
        selectionUpdate() {
            this.$emit('update', this.filtersToShow)
        },
    },
    name: 'FilterContainer',
    props: {
        canEdit: {
            default: () => false,
            required: false,
            type: Boolean,
        },
        filters: {
            required: true,
            type: Array,
        },
        filtersShown: {
            default: () => [],
            required: false,
            type: Array,
        },

        value: {
            default: () => ({}),
            type: Object,
        },
    },
}