import Vue from 'vue'

export default Vue.extend({
  name: 'EndOfResults',
  props: {
    dataDisplayLimit: {
      type: Number,
      required: true
    }
  }
})