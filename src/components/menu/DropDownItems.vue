<template>
  <div :class="{'dropdown-menu': depth === 0}" :aria-labelledby="parent.id">
    <template v-for="(item, index) in items">
      <a v-if="item.type === 'plugin'"
         class="dropdown-item"
         :key="item.id + index"
         :href="`/menu/${parent.id}/${href(item)}`"
         :class="'menu-depth-'+ depth">
        {{ item.label }}
      </a>

      <span v-else :key="item.id">
        <h5 class="dropdown-header" :class="'menu-depth-'+ depth">
          <b>{{item.label}}</b>
        </h5>
        <drop-down-items :parent="item" :items="item.items" :depth="depth + 1"/>
      </span>
    </template>
  </div>
</template>

<script>

export default {
  name: 'drop-down-items',
  props: {
    parent: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    depth: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    href: (item) => item.params ? `${item.id}?${item.params}` : item.id
  }
}
</script>

<style>
  .menu-depth-1 {
    padding-left: 2rem;
  }

  .menu-depth-2 {
    padding-left: 3rem;
  }

  .menu-depth-3 {
    padding-left: 4rem;
  }

  .menu-depth-4 {
    padding-left: 5rem;
  }

  .menu-depth-5 {
    padding-left: 6rem;
  }
</style>
