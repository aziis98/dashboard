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
module.exports = __webpack_require__(13);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _widgets = __webpack_require__(2);

var _widgets2 = _interopRequireDefault(_widgets);

var _buttonRemove = __webpack_require__(3);

var _note = __webpack_require__(5);

var _dynamic = __webpack_require__(7);

var _widget = __webpack_require__(10);

var _toolbar = __webpack_require__(11);

var _tooltip = __webpack_require__(12);

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

            if (this.panning) return;
            console.log('Saving state!');

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
            this.save();
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
            align = _ref$align === undefined ? 'left' : _ref$align,
            _ref$monospaced = _ref.monospaced,
            monospaced = _ref$monospaced === undefined ? false : _ref$monospaced;

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
            script: script,
            updateIntervalSeconds: updateIntervalSeconds,
            fnInputs: [/*
                       { name, value }
                       */]
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
        focused: false,
        far: false

    }, factories[type](opts));
}

exports.default = {
    createWidget: createWidget
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _buttonRemoveVue = __webpack_require__(4);

var _buttonRemoveVue2 = _interopRequireDefault(_buttonRemoveVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('button-remove', {
    template: _buttonRemoveVue2.default,
    data: function data() {
        return {
            Tooltip: Tooltip
        };
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<button \r\n    @mouseenter=\"Tooltip.showAtElement($event.target, 'Remove this widget')\"\r\n    @mouseleave=\"Tooltip.hide()\"\r\n    @click=\"Tooltip.hide(); $emit('click')\"\r\n    ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n</button>"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _noteVue = __webpack_require__(6);

var _noteVue2 = _interopRequireDefault(_noteVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('note', {
    template: _noteVue2.default,
    props: {
        input: Object,
        focused: Boolean
    },

    data: function data() {
        return {
            Tooltip: Tooltip
        };
    },

    computed: {
        lines: function lines() {
            return this.input.note.split('\n');
        }
    },

    methods: {
        copyUID: function copyUID() {
            document.querySelector('#tooltip textarea').select();
            document.execCommand('copy');
        }
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<div class=\"note\">\r\n\r\n    <div v-if=\"input.focused\" class=\"options\">\r\n        <div>\r\n            <div class=\"group\">\r\n                <button @click=\"input.align = 'left'\"><i class=\"fa fa-align-left\" aria-hidden=\"true\"></i></button>\r\n                <button @click=\"input.align = 'center'\"><i class=\"fa fa-align-center\" aria-hidden=\"true\"></i></button>\r\n                <button @click=\"input.align = 'right'\"><i class=\"fa fa-align-right\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n\r\n            <input id=\"opt-mono\" type=\"checkbox\" v-model=\"input.monospaced\">\r\n            <label for=\"opt-mono\" class=\"font-monospaced\">Monospaced Font</label>\r\n        </div>\r\n\r\n        <div>\r\n            <button \r\n                class=\"question\"\r\n                @mouseenter=\"Tooltip.showAtElement($event.target, { html: '<p>Click to copy the uid to the clipboard: <textarea>' + input.uid + '</textarea></p>' })\"\r\n                @mouseleave=\"Tooltip.hide()\"\r\n                @click=\"copyUID()\"\r\n                ><i class=\"fa fa-question\" aria-hidden=\"true\"></i></button>\r\n            \r\n            <button-remove @click=\"$emit('removed')\"></button-remove>\r\n        </div>\r\n    </div>\r\n\r\n    <div \r\n        :class=\"[ 'title', { 'font-monospaced': input.monospaced } ]\"\r\n        :style=\"{ textAlign: input.align }\"\r\n        v-if=\"lines.length > 10 && lines[0].trim().length > 0\"\r\n        >{{lines[0]}}</div>\r\n\r\n    <textarea\r\n        :class=\"{ 'font-monospaced': input.monospaced }\"\r\n        :style=\"{ textAlign: input.align }\"\r\n        v-model=\"input.note\"\r\n        :rows=\"lines.length\"\r\n        ></textarea>\r\n</div>"

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dynamicVue = __webpack_require__(8);

var _dynamicVue2 = _interopRequireDefault(_dynamicVue);

var _explainScript = __webpack_require__(9);

var _explainScript2 = _interopRequireDefault(_explainScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function $args(func) {
    return func.toString().match(/\((.+?)\) =>/)[1].split(',').map(function (it) {
        return it.trim();
    });
}

window.$args = $args;

function $valueify(value) {
    var n = Number(value);
    return isNaN(n) ? value : n;
}

function $ref(uid) {
    if (app && app.widgets) return app.widgets[uid];
}

Vue.component('dynamic', {
    template: _dynamicVue2.default,
    props: {
        input: Object,
        focused: Boolean
    },

    data: function data() {
        return {
            timer: null,
            isFn: false,
            result: '',

            Tooltip: Tooltip
        };
    },

    watch: {
        'input.updateIntervalSeconds': function inputUpdateIntervalSeconds() {
            this.teardownTimer();
            this.setupTimer();
        },
        'input.script': function inputScript() {
            this.teardownTimer();
            this.updateFnInputs();
            this.setupTimer();
        },
        'input.fnInputs': {
            handler: function handler() {
                this.evalScript();
                this.$emit('updated');
            },
            deep: true
        }
    },

    mounted: function mounted() {
        this.updateFnInputs();
        this.setupTimer();
    },

    beforeDestroy: function beforeDestroy() {
        this.teardownTimer();
    },

    methods: {

        setupTimer: function setupTimer() {
            var _this = this;

            if (this.input.updateIntervalSeconds > 0) {
                this.timer = setInterval(function () {
                    _this.evalScript();
                }, this.input.updateIntervalSeconds * 1000);
            } else {
                this.timer = null;
            }

            this.evalScript();
        },
        teardownTimer: function teardownTimer() {
            if (this.timer) clearInterval(this.timer);
        },

        updateFnInputs: function updateFnInputs() {
            var _this2 = this;

            var result = void 0;

            try {
                result = eval(this.input.script);
            } catch (e) {
                result = 'error';
            }

            if (typeof result === 'function') {
                var names = $args(result);

                this.isFn = names.length > 0;

                if (this.input.fnInputs.map(function (it) {
                    return it.name;
                }) !== names) {
                    this.input.fnInputs = names.map(function (name, i) {
                        return {
                            name: name,
                            value: _this2.input.fnInputs[i].value || ''
                        };
                    });
                }
            } else if (result !== 'error') {
                this.input.fnInputs = [];
            }
        },

        evalScript: function evalScript() {
            try {
                var evaluatedScript = eval(this.input.script);

                if (this.isFn) {
                    var args = this.input.fnInputs.map(function (it) {
                        return $valueify(it.value);
                    });
                    this.result = evaluatedScript.apply(undefined, _toConsumableArray(args)).toString();
                } else {
                    this.result = evaluatedScript.toString();
                }
            } catch (error) {
                this.result = error.message;
            }
        },

        showTooltip: function showTooltip(el) {
            Tooltip.showAtElement(el, { html: _explainScript2.default });
        }
    }
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div class=\"dynamic\">\r\n\r\n    <div v-if=\"input.focused\" class=\"options\">\r\n        <input class=\"interval\" type=\"text\" v-model=\"input.updateIntervalSeconds\" title=\"The update interval in seconds\">\r\n\r\n        <div class=\"group\">\r\n            <input type=\"text\" v-model=\"input.script\" title=\"The script to execute\">\r\n            <button \r\n                class=\"question\"\r\n                @mouseenter=\"showTooltip($event.target)\"\r\n                @mouseleave=\"Tooltip.hide()\"\r\n                ><i class=\"fa fa-question\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n\r\n        <button-remove @click=\"$emit('removed')\"></button-remove>\r\n    </div>\r\n\r\n    <div class=\"computed\">\r\n        <div class=\"inputs\">\r\n            <input\r\n                type=\"text\"\r\n                v-for=\"fnInput in input.fnInputs\" \r\n                v-model=\"fnInput.value\" \r\n                :placeholder=\"fnInput.name\"\r\n                :title=\"fnInput.name\"\r\n                \r\n                @mouseenter=\"Tooltip.show($event.target, fnInput.name)\"\r\n                @mouseleave=\"Tooltip.hide()\"\r\n                >\r\n        </div>\r\n\r\n        <div class=\"result\">{{result}}</div>\r\n    </div>\r\n\r\n</div>"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=\"title\">\r\n    Scripting\r\n</div>\r\n<p>\r\n    If The update interval is different from <code>0</code> this code will be executed based on the given interval. What\r\n    the script procduces as a result is rendered below as text. Formatted content is not yet supported. If the script contains\r\n    an arrow function, for every parameter an input field will be rendered and the result of the arrow function with the\r\n    given input will be rendered.\r\n</p>\r\n<div class=\"title\">\r\n    One line isn't enough!\r\n</div>\r\n<p>\r\n    If you feel that one line is not enough you can use the text present in another note by placeing a reference in the following\r\n    way:\r\n</p>\r\n<pre>\r\n    <code>\r\n        eval($ref('note-db29ef329').note)\r\n    </code>\r\n</pre>"

/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SOME_MARGIN = 4;
var positionRectMapper = {
    'bottom-center': function bottomCenter(rect) {
        return {
            x: rect.left + rect.width * 0.5,
            y: rect.top + rect.height + SOME_MARGIN
        };
    },
    'center-left': function centerLeft(rect) {
        return {
            x: rect.left - SOME_MARGIN,
            y: rect.top + rect.height * 0.5
        };
    }
};

var Tooltip = new Vue({
    el: '#tooltip',

    data: {
        isShown: false,
        x: 400, y: 400,

        message: 'Tooltip di prova',
        position: 'bottom-center'
    },

    methods: {

        showAtPosition: function showAtPosition(x, y, message) {
            var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bottom-center';

            this.isShown = true;
            this.message = message;
            this.x = x;
            this.y = y;
        },
        showAtElement: function showAtElement(element, message) {
            var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom-center';

            var bounds = element.getBoundingClientRect();

            var _positionRectMapper$p = positionRectMapper[position](bounds),
                x = _positionRectMapper$p.x,
                y = _positionRectMapper$p.y;

            this.showAtPosition(x, y, message, position);
        },

        show: function show(element, message) {
            var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom-center';

            this.showAtElement(element, message, position);
        },

        hide: function hide() {
            this.isShown = false;
        }

    }
});

window.Tooltip = Tooltip;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);