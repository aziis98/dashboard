
// dashboard
// Copyright 2017 Antonio De Lucreziis

import ww from './widgets';

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
})

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

import { Toolbar, Tool } from './components/toolbar'

const app = new Vue({
    el: '#app',
    data: {

        widgets: { },

        pan: { x: innerWidth * 0.5, y: innerHeight * 0.5 },

        lastMouseEvent: null,
        mouse: { dx: 0, dy: 0 },
        panning: false,

    },

    created: function () {
        if (!localStorage.getItem('dashboard')) {
            localStorage.setItem('dashboard', 'true');
        }
        else {
            // load
            const { widgets, pan } = JSON.parse(localStorage.getItem('dashboard-store'));

            this.widgets = widgets;
            this.pan = pan;
        }
    },

    methods: {

        onPanStart: function(e) {
            if (e.target === this.$el) {
                this.panning = true;
            }
        },

        onMouseMove: function(e) {
            if (this.lastMouseEvent) {
                this.mouse = {
                    dx: e.clientX - this.lastMouseEvent.clientX,
                    dy: e.clientY - this.lastMouseEvent.clientY,
                };
            }

            if (e.target === this.$el && this.panning) {
                this.pan = {
                    x: this.pan.x + this.mouse.dx,
                    y: this.pan.y + this.mouse.dy,
                };
            }

            this.lastMouseEvent = e;
        },

        onPanEnd: function(e) {
            this.panning = false;
            this.save();

            if (e.target === this.$el) {
                Object.keys(this.widgets).forEach(uid => {
                    this.widgets[uid].focused = false;
                });
            }
        },

        save: function () {
            localStorage.setItem('dashboard-store', JSON.stringify({
                widgets: this.widgets,
                pan: this.pan,
            }));
        },

        addWidget: function (type, opts) {
            const widget = ww.createWidget(this.pan, type, opts);
            
            this.widgets = Object.assign({}, this.widgets, {
                [widget.uid]: widget
            });

            this.$forceUpdate();
        },

        onWidgetSelected: function (uid) {
            Object.keys(this.widgets).forEach(uid => {
                this.widgets[uid].focused = false;
            });
            this.widgets[uid].focused = true;
        },
    }
});

window.ww = ww;
window.app = app;