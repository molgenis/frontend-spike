import { library } from '@fortawesome/fontawesome-svg-core'
import { mapMutations } from 'vuex'
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'


library.add(faShoppingCart, faMinus, faPlus)

export default {
    methods: {
        ...mapMutations(['toggleShoppingItems']),
    },
    name: 'ShoppingButton',
    props: {
        id: {
            required: true,
            type: String,
        },
        isSelected: {
            required: true,
            type: Boolean,
        },
    },
}