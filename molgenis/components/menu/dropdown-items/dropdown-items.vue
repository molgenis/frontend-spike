<component>
    <div :aria-labelledby="parent.id" :class="{'dropdown-menu': depth === 0}">
        <template v-for="(item, index) in items">
            <a
                :class="'menu-depth-'+ depth"
                :href="`/menu/${parent.id}/${href(item)}`"
                :key="item.id + index"
                class="dropdown-item"
                v-if="item.type === 'plugin'"
            >
                {{ item.label }}
            </a>

            <span :key="item.id" v-else>
                <h5 :class="'menu-depth-'+ depth" class="dropdown-header">
                    <b>{{item.label}}</b>
                </h5>
                <drop-down-items :depth="depth + 1" :items="item.items" :parent="item" />
            </span>
        </template>
    </div>
</component>

