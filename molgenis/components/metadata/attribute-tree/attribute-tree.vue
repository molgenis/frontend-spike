<component>
    <div>
        <ul class="fa-ul">
            <draggable @end="drag=false" @start="drag=true" v-model="attributes">
                <MetadataAttributeTreeNode
                    :attribute="attribute" :on-attribute-select="onAttributeSelect"
                    v-for="attribute in attributes"
                />
            </draggable>
        </ul>
    </div>
</component>