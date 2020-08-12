import CustomCardContent from '../custom-card-content/custom-card-content.js'
import DefaultCardContent from '../default-card-content/default-card-content.js'
import ShoppingButton from '../shopping-button/shopping-button.js'
import Vue from 'vue'


export default {
    components: { CustomCardContent, DefaultCardContent, ShoppingButton },
    methods: {
        handleDefaultCardExpand() {
            this.$emit('expandCard', { id: this.dataId })
        },
    },
    name: 'ExplorerCard',
    props: {
        collapseLimit: {
            default: () => 5,
            type: Number,
        },
        customCode: {
            required: false,
            type: String,
        },
        dataContents: {
            required: true,
            type: Object,
        },
        dataId: {
            required: true,
            type: String,
        },
        dataLabel: {
            required: true,
            type: String,
        },
        dataTable: {
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

        numberOfAttributes: {
            required: true,
            type: Number,
        },
    },
}