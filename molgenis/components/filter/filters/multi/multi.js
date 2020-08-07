import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faExclamationTriangle,
    faSpinner,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes, faExclamationTriangle, faSpinner)

export default {
    components: { FontAwesomeIcon },
    props: {
        name: {
            required: true,
            type: String,
        },
        placeholder: {
            default: () => '',
            required: false,
            type: String,
        },
        label: {
            type: String,
            required: false,
            default: () => '',
        },
        options: {
            type: Function,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
        maxVisibleOptions: {
            type: Number,
            default: () => 10,
        },
    },
    data() {
        return {
            inputOptions: [],
            isLoading: false,
            query: '',
            showCount: 0,
            triggerQuery: Number,
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
        slicedOptions: function() {
            return this.inputOptions.slice(0, this.showCount)
        },
        foundOptionCount() {
            return this.inputOptions.length
        },
        showMoreText() {
            const remaining = this.foundOptionCount - this.showCount
            if (remaining <= this.maxVisibleOptions) {
                return `Show remaining ${remaining}`
            } else {
                return `Show ${this.maxVisibleOptions} more`
            }
        },
    },
    watch: {
        query: function(newVal) {
            const previousSelection = this.inputOptions.filter(
                option => this.selection.indexOf(option.value) >= 0,
            )
            this.inputOptions = previousSelection

            if (this.triggerQuery) {
                clearTimeout(this.triggerQuery)
            }
            this.triggerQuery = setTimeout(async() => {
                clearTimeout(this.triggerQuery)
                if (newVal.length) {
                    this.showCount = this.maxVisibleOptions
                    this.isLoading = true
                    try {
                        const fetched = await this.options(true, 'like', this.query)
                        const valuesPresent = previousSelection.map(prev => prev.value)

                        if (valuesPresent) {
                            const difference = fetched.filter(
                                prev => !valuesPresent.includes(prev.value),
                            )
                            this.inputOptions = previousSelection.concat(difference)
                        } else {
                            this.inputOptions = fetched
                        }
                    } catch (err) {
                        throw new Error(err)
                    } finally {
                        this.isLoading = false
                    }
                }
            }, 500)
        },
    },
    created() {
        this.showCount = this.maxVisibleOptions
    },
    beforeMount() {
        if (this.value && this.value.length > 0) {
            this.initializeFilter()
        }
    },
    methods: {
        async initializeFilter() {
            const fetched = await this.options(false, 'in', this.value.join(','))
            this.inputOptions = fetched
        },
        showMore() {
            this.showCount += this.maxVisibleOptions
        },

    },
}