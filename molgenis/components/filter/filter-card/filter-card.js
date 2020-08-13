import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'


library.add(faCaretRight, faTimes)

export default {
    computed: {
        iconStyle() {
            return {
                transform: `rotate(${this.isOpen ? 90 : 0}deg)`,
                transition: 'transform 0.2s',
            }
        },
    },
    data() {
        return {
            isOpen: this.collapsable ? !this.collapsed : true,
        }
    },
    methods: {
        removeFilter() {
            this.$emit('removeFilter', this.name)
        },
        toggleState() {
            if (this.collapsable) {
                this.isOpen = !this.isOpen
                return this.isOpen
            }
            return false
        },
    },
    props: {
        canRemove: {
            default: () => false,
            required: false,
            type: Boolean,
        },
        collapsable: {
            default: () => true,
            required: false,
            type: Boolean,
        },
        collapsed: {
            default: () => true,
            required: false,
            type: Boolean,
        },
        description: {
            default: () => '',
            required: false,
            type: String,
        },
        label: {
            default: () => '',
            required: false,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
    },
}