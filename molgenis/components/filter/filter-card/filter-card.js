import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCaretRight, faTimes)

export default Vue.extend({
  name: 'FilterCard',
  components: { FontAwesomeIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: () => true
    },
    collapsable: {
      type: Boolean,
      required: false,
      default: () => true
    },
    description: {
      type: String,
      required: false,
      default: () => ''
    },
    canRemove: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      isOpen: this.collapsable ? !this.collapsed : true
    }
  },
  computed: {
    iconStyle () {
      return {
        transform: `rotate(${this.isOpen ? 90 : 0}deg)`,
        transition: 'transform 0.2s'
      }
    }
  },
  methods: {
    removeFilter () {
      this.$emit('removeFilter', this.name)
    },
    toggleState () {
      if (this.collapsable) {
        this.isOpen = !this.isOpen
        return this.isOpen
      }
      return false
    }
  }
})