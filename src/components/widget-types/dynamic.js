
Vue.component('dynamic', {
    template: '#widget-dynamic-template',
    props: {
        input: Object,
        focused: Boolean,
    },
    computed: {
        rendered: function () {
            try {
                return eval(this.input.script);
            } catch (error) {
                return error;
            }
        },
    },
    data: () => ({
        timer: null,
    }),

    watch: {
        'input.updateIntervalSeconds': function () {
            this.teardownTimer();
            this.setupTimer();
        },
    },

    mounted: function () {
        this.setupTimer();
    },

    beforeDestroy: function () {
        this.teardownTimer();
    },

    methods: {
        setupTimer: function () {
            this.timer = setInterval(() => {
                const s = this.input.script;
                this.input.script = '';
                this.input.script = s;
            }, this.input.updateIntervalSeconds * 1000);
        },
        teardownTimer: function () {
            clearInterval(this.timer);
        },
    }
});