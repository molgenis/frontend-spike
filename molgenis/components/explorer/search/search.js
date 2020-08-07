import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createBookmark } from '@/mappers/bookmarkMapper'

library.add(faSearch)

export default {
  name: 'SearchComponent',
  components: { FontAwesomeIcon },
  props: {
    value: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      searchText: this.value
    }
  },
  methods: {
    handleSearchAction () {
      this.$emit('input', this.searchText)
      createBookmark(this.$router)
    }
  },
  watch: {
    value: {
      handler: function (val) {
        if (val === '') {
          this.searchText = ''
        }
      },
      immediate: true
    },
    searchText: {
      // Add handler to support html5 clear search action
      handler: function (val) {
        if (val === '') {
          this.handleSearchAction()
        }
      },
      immediate: true
    }
  }
}