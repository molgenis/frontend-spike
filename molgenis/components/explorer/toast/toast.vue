<component>
    <transition name="slide">
        <div
            id="alert-message" :class="'alert alert-' + type"
            role="alert"
            v-if="message"
        >
            <button @click="$emit('toastCloseBtnClicked')" class="close" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
            <span id="message-span">{{ message }}</span>
        </div>
    </transition>
</component>
