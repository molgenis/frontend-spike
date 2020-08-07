export default {
    props: {
        name: {
            required: true,
            type: String,
        },
        label: {
            required: false,
            type: String,
            default: () => '',
        },
        options: {
            required: true,
            type: [Function],
        },
        value: {
            type: Array,
            default: () => [],
        },
        bulkOperation: {
            type: Boolean,
            required: false,
            default: () => true,
        },
        maxVisibleOptions: {
            type: Number,
            default: () => undefined,
        },
    },
    data() {
        return {
            resolvedOptions: [],
            sliceOptions: this.maxVisibleOptions && this.resolvedOptions && this.maxVisibleOptions < this.resolvedOptions.length,
        }
    },
    computed: {
        selection: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value.length === 0 ? undefined : value)
            },
        },
        visibleOptions() {
            return this.sliceOptions ? this.resolvedOptions.slice(0, this.maxVisibleOptions) : (typeof this.resolvedOptions === 'function' ? [] : this.resolvedOptions)
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
    },
    watch: {
        resolvedOptions() {
            this.sliceOptions = this.showToggleSlice
        },
        maxVisibleOptions() {
            this.sliceOptions = this.showToggleSlice
        },
    },
    created() {
        this.options().then(response => {
            this.resolvedOptions = response
        })
    },
    methods: {
        toggleSelect() {
            this.selection = this.selection && this.selection.length ? [] : this.resolvedOptions.map(option => option.value)
        },
        toggleSlice() {
            this.sliceOptions = !this.sliceOptions
        },
    },
}