import Vue from 'vue'

export default Vue.extend({
  name: 'ToastComponent',
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
})