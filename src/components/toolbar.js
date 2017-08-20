
Vue.component('toolbar', {
    template: '#toolbar-template',
});

Vue.component('tool', {
    template: '#tool-template',
    props: ['name'],
    computed: {
        isEmpty: function () {
            return !this.$slots.default;
        },
    },
});