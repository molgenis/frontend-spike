import AddFilterModal from './AddFilterModal.vue'
import { FilterCard } from '.'
import * as components from './filters'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { AddFilterModal, draggable, FilterCard, ...components },
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    },
    filtersShown: {
      type: Array,
      required: false,
      default: () => []
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      filtersToShow: this.filtersShown,
      filterToAdd: null,
      drag: false,
      width: 0,
      mobileToggle: false
    }
  },
  computed: {
    doCollapse () {
      // Bootstrap's mobile collapse width
      return this.width <= 576
    },
    doDragDrop () {
      return this.canEdit && !this.doCollapse
    },
    listOfVisibleFilters () {
      return this.filtersToShow.map(id => this.filters.find(filter => filter.name === id)).filter(item => item !== undefined)
    },
    listOfInvisibleFilters () {
      return this.filters.filter(filter => !this.filtersToShow.includes(filter.name))
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.width = window.innerWidth
    },
    removeFilter (name) {
      this.filtersToShow = this.filtersToShow.filter(filter => name !== filter)
      this.$emit('update', this.filtersToShow)

      let selections = { ...this.value }
      delete selections[name]
      this.$emit('input', selections)
    },
    selectionChange (name, value) {
      this.$emit('input', { ...this.value, [name]: value })
    },
    selectionUpdate () {
      this.$emit('update', this.filtersToShow)
    }
  }
}