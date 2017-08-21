
import template from '../../templates/note.vue.html';

Vue.component('note', {
    template,
    props: {
        input: Object,
        focused: Boolean,
    },

    data: () => ({
        Tooltip,
    }),

    computed: {
        lines: function () {
            return this.input.note.split('\n');
        },
    },

    methods: {
        copyUID: function () {
            document.querySelector('#tooltip textarea').select();
            document.execCommand('copy');
        }
    }
});