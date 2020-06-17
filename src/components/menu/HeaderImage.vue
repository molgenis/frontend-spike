<template>
    <div id="top-logo-vue-banner" :style="{ height: imgMaxHeight + 'px' }" class="bg-light">
      <span class="mg-top-logo-helper" />
      <a href="/">
        <img id="logo-top" class="logo-top" alt="" :src="imgSrc" :style="{ maxHeight: imgMaxHeight + 'px' }" />
      </a>
    </div>
</template>

<script>
export default {
  name: 'HeaderImage',
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    imgMaxHeight: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
  .logo-top {
    max-width: 90%;
    vertical-align: middle;
    border: 0;
  }

  .mg-top-logo-helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
</style>
