export default {
    name: 'TableHeader',
    props: {
      visibleColumns: {
        type: Array,
        required: true
      },
      isShop: {
        type: Boolean,
        required: false,
        default: () => false
      }
    }
  }