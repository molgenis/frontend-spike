
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Vue from 'vue'


library.add(faPlus)

export default Vue.extend({
    components: { FontAwesomeIcon },
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
})