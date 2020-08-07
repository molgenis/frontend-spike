import Vue from 'vue'

export default Vue.extend({
  name: 'TableSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    packageTables: {
      type: Array,
      required: true
    }
  }
})