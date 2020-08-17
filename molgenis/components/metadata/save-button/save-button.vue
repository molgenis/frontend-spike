<component>
    <button
        :class="[classObject]" :disabled="disabled"
        @click="onClick"
        type="button"
    >
        <slot>Save</slot>
    </button>
</component>