import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
    name: 'StringFilter',
    components: { FontAwesomeIcon },
    props: {
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
            default: () => '',
        },
        value: {
            type: String,
            default: () => '',
        },
    },
    computed: {
        model: {
            get() {
                return this.value || ''
            },
            set(value) {
                this.$emit('input', value === '' ? undefined : value)
            },
        },
    },
})