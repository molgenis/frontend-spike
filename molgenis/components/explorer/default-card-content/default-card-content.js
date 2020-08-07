import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faChevronUp, faChevronRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faChevronRight, faChevronUp, faEdit, faTrash)

export default Vue.extend({
  name: 'DefaultCardContent',
  data: () => {
    return {
      cardState: 'closed'
    }
  },
  props: {
    dataLabel: {
      type: String,
      required: true
    },
    dataId: {
      type: String,
      required: true
    },
    dataTable: {
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
    collapseLimit: {
      type: Number,
      default: () => 5
    }
  },
  components: { FontAwesomeIcon },
  computed: {
    expandBtnText () {
      return this.cardState === 'closed' ? 'Expand' : 'Collapse'
    },
    dataToShow () {
      if (this.cardState === 'closed') {
        const elementsToShow = Object.keys(this.dataContents).slice(0, this.collapseLimit)
        return elementsToShow.reduce((accumulator, key) => {
          accumulator[key] = this.dataContents[key]
          return accumulator
        }, {})
      } else {
        return this.dataContents
      }
    },
    detailLink () {
      return `/menu/main/dataexplorer/details/${this.dataTable}/${this.dataId}`
    }
  },
  methods: {
    goToDetails () {
      window.location.assign(this.detailLink)
    },
    handleExpandBtnClicked () {
      if (this.cardState === 'closed') {
        this.cardState = 'open'
        this.$emit('expandDefaultCard')
      } else {
        this.cardState = 'closed'
      }
    }
  }
})