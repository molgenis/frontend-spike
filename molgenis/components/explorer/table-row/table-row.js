import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import ShoppingButton from '../utils/ShoppingButton'


library.add(faEdit)

export default {
    components: { FontAwesomeIcon, ShoppingButton },
    name: 'TableRow',
    props: {
        id: {
            required: true,
            type: String,
        },
        isSelected: {
            default: () => false,
            required: false,
            type: Boolean,
        },
        isShop: {
            default: () => false,
            required: false,
            type: Boolean,
        },
        rowData: {
            required: true,
            type: Object,
        },
        tableName: {
            required: true,
            type: String,
        },

        visibleColumns: {
            required: true,
            type: Array,
        },
    },

}