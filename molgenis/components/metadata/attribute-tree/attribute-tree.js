import draggable from 'vuedraggable'
import { UPDATE_EDITOR_ENTITY_TYPE } from '/molgenis/store/mutations/metadata.js'


export default {
    components: {
        draggable,
    },
    computed: {
        attributes: {
            get() {
                return this.attributeTree
            },
            set(value) {
                this.createFlatTree(value)
                this.$store.commit(UPDATE_EDITOR_ENTITY_TYPE, { key: 'attributes', value: this.flatTree })
            },
        },
    },
    data() {
        return {
            flatTree: [],
        }
    },
    methods: {
        createFlatTree(attributeTree) {
            this.flatTree = []
            this.fillFlatTree(attributeTree)
        },
        fillFlatTree(attributeTree) {
            attributeTree.forEach((attr) => {
                this.flatTree.push(attr)
                if (attr.children.length > 0) {
                    this.fillFlatTree(attr.children)
                }
            })
        },
    },
    props: {
        attributeTree: {
            required: true,
            type: Array,
        },
        onAttributeSelect: {
            required: true,
            type: Function,
        },
    },
}