
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Vue from 'vue'


library.add(faTimes)

export default Vue.extend({
    components: { FontAwesomeIcon },
    data() {
        return {
            activeValues: [],
        }
    },
    methods: {
        async buildActiveValues(newValue) {
            const activeValues = []
            Object.entries(newValue).forEach(async([key, current]) => {
                const filter = this.selectFilter(key)

                // Clean op the values by removing undefined entry's
                if (current === undefined || (Array.isArray(current) && !current.length)) return

                if (filter.type === 'date-time-filter') {
                    let value

                    if (current.startDate.toISOString() === current.endDate.toISOString()) {
                        value = current.startDate.toLocaleDateString()
                    } else {
                        value = `${current.startDate.toLocaleDateString()} - ${current.endDate.toLocaleDateString()}`
                    }

                    activeValues.push({
                        key,
                        label: filter.label,
                        value,
                    })
                    return
                }

                // Unpack array
                if (Array.isArray(current)) {
                    // Checkbox
                    if (filter.type === 'checkbox-filter') {
                        // resolve options function/promise and show results later
                        const option = await filter.options()
                        current.forEach(subKey => {
                            const findTextFromValue = option.filter(
                                filter => filter.value === subKey,
                            )[0]
                            activeValues.push({
                                key,
                                label: filter.label,
                                subKey,
                                value: findTextFromValue.text,
                            })
                        })
                    }
                    // Range Filter
                    if (filter.type === 'range-filter') {
                        if (current[0] == null && current[1] != null) {
                            activeValues.push({
                                key,
                                label: filter.label,
                                value: `${current[1]} and less`,
                            })
                        } else if (current[0] != null && current[1] == null) {
                            activeValues.push({
                                key,
                                label: filter.label,
                                value: `${current[0]} and more`,
                            })
                        } else if (current[0] != null && current[1] != null) {
                            activeValues.push({
                                key,
                                label: filter.label,
                                value: `${current[0]} to ${current[1]}`,
                            })
                        }
                    }
                    if (filter.type === 'multi-filter') {
                        const options = await filter.options(false, 'in', current.join(','))
                        current.forEach(subKey => {
                            const findTextFromValue = options.filter(
                                filter => filter.value === subKey,
                            )[0]
                            activeValues.push({
                                key,
                                label: filter.label,
                                subKey,
                                value: findTextFromValue.text,
                            })
                        })
                    }
                } else {
                    // Single item
                    activeValues.push({
                        key,
                        label: filter.label,
                        value: current,
                    })
                }
            })
            if (this.value === newValue) {
                this.activeValues = activeValues
            }
        },
        removeFilter({ key, subKey }) {
            if (subKey === undefined) {
                let selections = { ...this.value }
                delete selections[key]
                this.$emit('input', selections)
            } else {
                let selections = { ...this.value }
                selections[key] = selections[key].filter(key => key !== subKey)
                this.$emit('input', selections)
            }
        },
        selectFilter(key) {
            return this.filters.filter(filter => filter.name === key)[0]
        },
    },
    name: 'ActiveFilters',
    props: {
        filters: {
            required: true,
            type: Array,
        },
        value: {
            default: () => ({}),
            type: Object,
        },
    },
    watch: {
        value: {
            handler(newValue) {
                this.buildActiveValues(newValue)
            },
            immediate: true,
        },
    },
})