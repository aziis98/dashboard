
Vue.component('widget', {
    template: '#widget-template',

    props: {
        input: {
            type: Object,
            /*

            - uid
            - location
            - type

            */
        },
        mouse: Object,
        pan: Object,
    },

    data: function () {
        return {
            lastMouseEvent: null,
            dragging: false,
        };
    },

    updated: function () {
        this.$emit('updated');
    },

    methods: {
        snap: function (value) {
            return Math.floor(value / 5) * 5;
        },

        onDragStart: function () {
            this.dragging = true;
        },
        onDragEnd: function () {
            this.dragging = false;
        },
    },

    watch: {
        mouse: function (mouse) {
            if (this.dragging) {
                this.input.location = {
                    x: this.input.location.x + mouse.dx,
                    y: this.input.location.y + mouse.dy,
                };
            }
        }
    }
});