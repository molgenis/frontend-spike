import VueForm from 'vue-form'
import VueCode from 'vue-code'

// import 'codemirror/lib/codemirror.css'
// import 'codemirror/mode/htmlmixed/htmlmixed'
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/python/python'
// import 'codemirror/mode/r/r'
// import 'codemirror/addon/hint/show-hint.js'
// import 'codemirror/addon/hint/show-hint.css'
// import 'codemirror/addon/hint/javascript-hint.js'
// import 'codemirror/addon/hint/html-hint.js'
// import 'codemirror/addon/hint/anyword-hint.js'
// import 'codemirror/addon/search/search.js'
// import 'codemirror/addon/search/searchcursor.js'
// import 'codemirror/addon/search/jump-to-line.js'
// import 'codemirror/addon/dialog/dialog.css'
// import 'codemirror/addon/dialog/dialog.js'

// import detectLang from '../../util/helpers/langDetect'


export default {
    components: {
        VueCode,
    },
    computed: {
        isInvalid() {
            return this.fieldState && ((this.fieldState.$touched || this.fieldState.$submitted || this.fieldState.$dirty) &&
          (!this.isValid || (this.isRequired && this.localValue === '')))
        },
        language: function() {
            const lang = detectLang(this.localValue).toString().toLowerCase()
            return this.field.type === 'html' || lang === 'html' ? 'htmlmixed' : lang === 'python' || lang === 'javascript' ? lang : 'r'
        },
        options: function() {
            return {
                extraKeys: { 'Ctrl-Space': 'autocomplete' },
                indentUnit: 2,
                indentWithTabs: true,
                lineNumbers: true,
                mode: this.language,
                readOnly: this.field.disabled,
                showCursorWhenSelecting: true,
                smartIndent: true,
                tabSize: 2,
            }
        },
    },
    data() {
        return {
            // Store a local value to prevent changing the parent state
            localValue: this.value,
        }
    },
    methods: {
        notTooLong() {
            return this.localValue.length < this.maxlength
        },
    },
    mixins: [VueForm],
    name: 'CodeEditorFieldComponent',
    props: {
        field: {
            required: true,
            type: FormField,
        },
        fieldState: {
            required: false,
            type: Object,
        },
        isRequired: {
            default: false,
            type: Boolean,
        },
        isValid: {
            default: true,
            type: Boolean,
        },
        maxlength: {
            default: 65535,
            type: Number,
        },
        value: {
            default: '',
            required: false,
            type: String,
        },
    },
    watch: {
        localValue(value) {
            // Emit value changes to the parent (form)
            this.$emit('input', value)
            this.fieldState.$touched = true
            this.fieldState.$dirty = true
        },
    },
}