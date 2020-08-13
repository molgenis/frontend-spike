import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'

import detectLang from '/molgenis/lib/helpers/ui-form/lang-detect.js'

import VueCode from 'vue-code'
import VueForm from 'vue-form'


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
    props: {
        field: {
            required: true,
            // type: FormField,
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