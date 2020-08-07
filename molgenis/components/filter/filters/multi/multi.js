import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faExclamationTriangle,
    faSpinner,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'


library.add(faTimes, faExclamationTriangle, faSpinner)

export default {
    beforeMount() {
        if (this.value && this.value.length > 0) {
            this.initializeFilter()
        }
    },
    components: { FontAwesomeIcon },
    computed: {
        foundOptionCount() {
            return this.inputOptions.length
        },
        selection: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value.length === 0 ? undefined : value)
            },
        },
        showMoreText() {
            const remaining = this.foundOptionCount - this.showCount
            if (remaining <= this.maxVisibleOptions) {
                return `Show remaining ${remaining}`
            } else {
                return `Show ${this.maxVisibleOptions} more`
            }
        },
        slicedOptions: function() {
            return this.inputOptions.slice(0, this.showCount)
        },
    },
    created() {
        this.showCount = this.maxVisibleOptions
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
    methods: {
        async initializeFilter() {
            const fetched = await this.options(false, 'in', this.value.join(','))
            this.inputOptions = fetched
        },
        showMore() {
            this.showCount += this.maxVisibleOptions
        },

    },
    props: {
        label: {
            default: () => '',
            required: false,
            type: String,
        },
        maxVisibleOptions: {
            default: () => 10,
            type: Number,
        },
        name: {
            required: true,
            type: String,
        },
        options: {
            required: true,
            type: Function,
        },
        placeholder: {
            default: () => '',
            required: false,
            type: String,
        },
        value: {
            default: () => [],
            type: Array,
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
}