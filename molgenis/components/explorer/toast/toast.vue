<component>
  <transition name="slide">
    <div id="alert-message" v-if="message" :class="'alert alert-' + type" role="alert">
      <button @click="$emit('toastCloseBtnClicked')" type="button" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <span id="message-span">{{ message }}</span>
    </div>
  </transition>
</component>
