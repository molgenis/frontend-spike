export default {
    computed: {
        selection: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value.length === 0 ? undefined : value)
            },
        },
        showToggleSlice() {
            return this.maxVisibleOptions && this.maxVisibleOptions < this.resolvedOptions.length
        },
        toggleSelectText() {
            return this.value.length ? 'Deselect all' : 'Select all'
        },
        toggleSliceText() {
            return this.sliceOptions ? `Show ${this.resolvedOptions.length - this.maxVisibleOptions} more` : 'Show less'
        },
        visibleOptions() {
            return this.sliceOptions ? this.resolvedOptions.slice(0, this.maxVisibleOptions) : (typeof this.resolvedOptions === 'function' ? [] : this.resolvedOptions)
        },
    },
    created() {
        this.options().then(response => {
            this.resolvedOptions = response
        })
    },
    data() {
        return {
            resolvedOptions: [],
            sliceOptions: this.maxVisibleOptions && this.resolvedOptions && this.maxVisibleOptions < this.resolvedOptions.length,
        }
    },
    methods: {
        toggleSelect() {
            this.selection = this.selection && this.selection.length ? [] : this.resolvedOptions.map(option => option.value)
        },
        toggleSlice() {
            this.sliceOptions = !this.sliceOptions
        },
    },
    props: {
        bulkOperation: {
            default: () => true,
            required: false,
            type: Boolean,
        },
        label: {
            default: () => '',
            required: false,
            type: String,
        },
        maxVisibleOptions: {
            default: () => undefined,
            type: Number,
        },
        name: {
            required: true,
            type: String,
        },
        options: {
            required: true,
            type: [Function],
        },
        value: {
            default: () => [],
            type: Array,
        },
    },
    watch: {
        maxVisibleOptions() {
            this.sliceOptions = this.showToggleSlice
        },
        resolvedOptions() {
            this.sliceOptions = this.showToggleSlice
        },
    },

}