
// dashboard
// Copyright 2017 Antonio De Lucreziis

import ww from './util/widgets';

import { Note } from './components/widget-types/note'
import { Dynamic } from './components/widget-types/dynamic'

import { Widget } from './components/widget'
import { Toolbar, Tool } from './components/toolbar'

const app = new Vue({
    el: '#app',
    data: {

        widgets: {},

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
            this.load();
        }
    },

    methods: {

        onPanStart: function (e) {
            if (e.target === this.$el) {
                this.panning = true;
            }
        },

        onMouseMove: function (e) {
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

        onPanEnd: function (e) {
            this.panning = false;
            this.save();

            if (e.target === this.$el) {
                Object.keys(this.widgets).forEach(uid => {
                    this.widgets[uid].focused = false;
                });
            }
        },

        load: function () {
            const { widgets, pan } = JSON.parse(localStorage.getItem('dashboard-store'));

            this.widgets = widgets;
            this.pan = pan;

            Object.keys(this.widgets).forEach(uid => {
                this.widgets[uid].focused = false;
            })
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

        onWidgetRemoved: function (uid) {
            Vue.delete(this.widgets, uid);
        },

        onWidgetSelected: function (uid) {
            if (!this.widgets[uid]) return;

            Object.keys(this.widgets).forEach(uid => {
                this.widgets[uid].focused = false;
            });
            this.widgets[uid].focused = true;
        },
    }
});

window.ww = ww;
window.app = app;