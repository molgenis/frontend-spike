<component>
    <li>
        <span @click="onAttributeSelect(attribute)" v-bind:class="{ 'selected-attribute-node': attribute.selected, 'node-content': true }">
            <i aria-hidden="true" v-bind:class="['fa', isFolder ? 'fa-folder-o' : 'fa-columns']" /> {{ attribute.label }}
        </span>
        <ul v-if="isFolder">
            <MetadataAttributeTreeNode v-for="child in attribute.children" :attribute="child" :on-attribute-select="onAttributeSelect" />
        </ul>
    </li>
</component>