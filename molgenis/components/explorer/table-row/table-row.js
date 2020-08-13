import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faEdit)

export default {
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