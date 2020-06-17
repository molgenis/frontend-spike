<template>
  <header>
    <div class="mg-sticky-header-padder" :style="{ height: headerHeight + 'px' }"></div>
    <div class="fixed-top" ref="stickyHeader">
        <header-image v-if="molgenisMenu.topLogo" :imgSrc="molgenisMenu.topLogo" :imgMaxHeight="molgenisMenu.topLogoMaxHeight"/>
        <nav-bar :molgenis-menu="molgenisMenu" />
    </div>
  </header>
</template>

<script>
import HeaderImage from './HeaderImage.vue'
import NavBar from './NavBar.vue'

export default {
  name: 'HeaderComponent',
  components: { NavBar, HeaderImage },
  props: ['molgenisMenu'],
  data () {
    return {
      headerHeight: null
    }
  },
  mounted: function () {
    // Use nextTick to wait for chikderen to render as per vue api guide
    this.$nextTick(() => {
      this.headerHeight = this.$refs.stickyHeader.clientHeight
    })
  }
}
</script>

<style>
  .mg-sticky-header-padder {
    margin: 0;
    padding: 0;
    border: 0;
  }
</style>
