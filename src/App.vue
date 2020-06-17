<template>
  <page-component id="app" v-on:contextLoaded="handleContextLoaded">
      <router-view/>
    </page-component>

</template>

<script>
import PageComponent from '@/components/menu/PageComponent.vue'

export default {
  components: { PageComponent },
  methods: {
    handleContextLoaded (context) {
      console.log(context)
    }
  },
  name: 'Molgenis'
}
</script>
