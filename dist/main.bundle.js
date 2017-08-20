/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widgets = __webpack_require__(2);

var _widgets2 = _interopRequireDefault(_widgets);

var _note = __webpack_require__(3);

var _dynamic = __webpack_require__(4);

var _widget = __webpack_require__(5);

var _toolbar = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// dashboard
// Copyright 2017 Antonio De Lucreziis

var app = new Vue({
    el: '#app',
    data: {

        widgets: {},

        pan: { x: innerWidth * 0.5, y: innerHeight * 0.5 },

        lastMouseEvent: null,
        mouse: { dx: 0, dy: 0 },
        panning: false

    },

    created: function created() {
        if (!localStorage.getItem('dashboard')) {
            localStorage.setItem('dashboard', 'true');
        } else {
            this.load();
        }
    },

    methods: {

        onPanStart: function onPanStart(e) {
            if (e.target === this.$el) {
                this.panning = true;
            }
        },

        onMouseMove: function onMouseMove(e) {
            if (this.lastMouseEvent) {
                this.mouse = {
                    dx: e.clientX - this.lastMouseEvent.clientX,
                    dy: e.clientY - this.lastMouseEvent.clientY
                };
            }

            if (e.target === this.$el && this.panning) {
                this.pan = {
                    x: this.pan.x + this.mouse.dx,
                    y: this.pan.y + this.mouse.dy
                };
            }

            this.lastMouseEvent = e;
        },

        onPanEnd: function onPanEnd(e) {
            var _this = this;

            this.panning = false;
            this.save();

            if (e.target === this.$el) {
                Object.keys(this.widgets).forEach(function (uid) {
                    _this.widgets[uid].focused = false;
                });
            }
        },

        load: function load() {
            var _this2 = this;

            var _JSON$parse = JSON.parse(localStorage.getItem('dashboard-store')),
                widgets = _JSON$parse.widgets,
                pan = _JSON$parse.pan;

            this.widgets = widgets;
            this.pan = pan;

            Object.keys(this.widgets).forEach(function (uid) {
                _this2.widgets[uid].focused = false;
            });
        },

        save: function save() {
            localStorage.setItem('dashboard-store', JSON.stringify({
                widgets: this.widgets,
                pan: this.pan
            }));
        },

        addWidget: function addWidget(type, opts) {
            var widget = _widgets2.default.createWidget(this.pan, type, opts);

            this.widgets = Object.assign({}, this.widgets, _defineProperty({}, widget.uid, widget));

            this.$forceUpdate();
        },

        onWidgetRemoved: function onWidgetRemoved(uid) {
            Vue.delete(this.widgets, uid);
        },

        onWidgetSelected: function onWidgetSelected(uid) {
            var _this3 = this;

            if (!this.widgets[uid]) return;

            Object.keys(this.widgets).forEach(function (uid) {
                _this3.widgets[uid].focused = false;
            });
            this.widgets[uid].focused = true;
        }
    }
});

window.ww = _widgets2.default;
window.app = app;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function generateUID() {
    return 'widget-' + Math.floor(Math.random() * Math.pow(16, 10)).toString(16).padStart(10, '0');
}

var factories = {

    'note': function note(_ref) {
        var _ref$note = _ref.note,
            _note = _ref$note === undefined ? "I'm a note!" : _ref$note,
            _ref$align = _ref.align,
            align = _ref$align === undefined ? 'left' : _ref$align;

        return {
            note: _note, align: align
        };
    },

    'dynamic': function dynamic(_ref2) {
        var _ref2$script = _ref2.script,
            script = _ref2$script === undefined ? "'I\\'m a new Dynamic! See: ' + Math.floor(Math.random() * 10)" : _ref2$script,
            _ref2$updateIntervalS = _ref2.updateIntervalSeconds,
            updateIntervalSeconds = _ref2$updateIntervalS === undefined ? 0.1 : _ref2$updateIntervalS;
        return {
            script: script, updateIntervalSeconds: updateIntervalSeconds
        };
    }

};

function createWidget(pan, type, opts) {

    return Object.assign({

        uid: generateUID(),
        location: {
            x: -pan.x + innerWidth * 0.5,
            y: -pan.y + innerHeight * 0.5
        },
        type: type,
        focused: false

    }, factories[type](opts));
}

exports.default = {
    createWidget: createWidget
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Vue.component('note', {
    template: '#widget-note-template',
    props: {
        input: Object,
        focused: Boolean
    },
    computed: {
        lines: function lines() {
            return this.input.note.split('\n');
        }
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Vue.component('dynamic', {
    template: '#widget-dynamic-template',
    props: {
        input: Object,
        focused: Boolean
    },
    computed: {
        rendered: function rendered() {
            try {
                return eval(this.input.script);
            } catch (error) {
                return error;
            }
        }
    },
    data: function data() {
        return {
            timer: null
        };
    },

    watch: {
        'input.updateIntervalSeconds': function inputUpdateIntervalSeconds() {
            this.teardownTimer();
            this.setupTimer();
        }
    },

    mounted: function mounted() {
        this.setupTimer();
    },

    beforeDestroy: function beforeDestroy() {
        this.teardownTimer();
    },

    methods: {
        setupTimer: function setupTimer() {
            var _this = this;

            this.timer = setInterval(function () {
                var s = _this.input.script;
                _this.input.script = '';
                _this.input.script = s;
            }, this.input.updateIntervalSeconds * 1000);
        },
        teardownTimer: function teardownTimer() {
            clearInterval(this.timer);
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Vue.component('widget', {
    template: '#widget-template',

    props: {
        input: {
            type: Object
            /*
              - uid
            - location
            - type
              */
        },
        mouse: Object,
        pan: Object
    },

    data: function data() {
        return {
            lastMouseEvent: null,
            dragging: false
        };
    },

    updated: function updated() {
        this.$emit('updated');
    },

    methods: {
        snap: function snap(value) {
            return Math.floor(value / 5) * 5;
        },

        onDragStart: function onDragStart() {
            this.dragging = true;
        },
        onDragEnd: function onDragEnd() {
            this.dragging = false;
        }
    },

    watch: {
        mouse: function mouse(_mouse) {
            if (this.dragging) {
                this.input.location = {
                    x: this.input.location.x + _mouse.dx,
                    y: this.input.location.y + _mouse.dy
                };
            }
        }
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Vue.component('toolbar', {
    template: '#toolbar-template'
});

Vue.component('tool', {
    template: '#tool-template',
    props: ['name'],
    computed: {
        isEmpty: function isEmpty() {
            return !this.$slots.default;
        }
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);