import Vue from 'vue'
import ShoppingButton from '../utils/ShoppingButton'
import DefaultCardContent from './DefaultCardContent'
import CustomCardContent from './CustomCardContent'

export default Vue.extend({
  name: 'ExplorerCard',
  props: {
    dataId: {
      type: String,
      required: true
    },
    dataTable: {
      type: String,
      required: true
    },
    dataLabel: {
      type: String,
      required: true
    },
    dataContents: {
      type: Object,
      required: true
    },
    numberOfAttributes: {
      type: Number,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: () => false
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    },
    customCode: {
      type: String,
      required: false
    },
    collapseLimit: {
      type: Number,
      default: () => 5
    }
  },
  components: { ShoppingButton, DefaultCardContent, CustomCardContent },
  methods: {
    handleDefaultCardExpand () {
      this.$emit('expandCard', { id: this.dataId })
    }
  }
})