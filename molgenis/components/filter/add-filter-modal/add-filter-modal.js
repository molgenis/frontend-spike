
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faPlus)

export default {
    computed: {
        options() {
            return this.filters.map(it => ({
                text: it.label,
                value: it.name,
            }))
        },
    },
    data() {
        return {
            selected: null,
        }
    },
    methods: {
        addFilter() {
            if (this.selected != null) {
                this.$emit('input', [ ...this.value, this.selected ])
            }
        },
        resetModal() {
            this.selected = this.filters[0].name
        },

    },
    name: 'AddFilterModal',
    props: {
        filters: {
            required: true,
            type: Array,
        },
        value: {
            default: () => [],
            type: Array,
        },
    },
}