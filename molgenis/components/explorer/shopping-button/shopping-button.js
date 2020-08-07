import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapMutations } from 'vuex'

library.add(faShoppingCart, faMinus, faPlus)

export default Vue.extend({
  name: 'ShoppingButton',
  props: {
    id: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapMutations(['toggleShoppingItems'])
  },
  components: { FontAwesomeIcon }
})