
Vue.component('note', {
    template: '#widget-note-template',
    props: {
        input: Object,
        focused: Boolean,
    },
    computed: {
        lines: function () {
            return this.input.note.split('\n');
        },
    },
});