
import template from '../../templates/dynamic.vue.html';
import questionTooltip from '../../tooltips/explain-script.html'

function $args(func) {
    return func.toString()
        .match(/\((.+?)\) =>/)[1]
        .split(',')
        .map(it => it.trim());
}

window.$args = $args;

function $valueify(value) {
    const n = Number(value);
    return isNaN(n) ? value : n;
}

function $ref(uid) {
    if (app && app.widgets) return app.widgets[uid];
}

Vue.component('dynamic', {
    template,
    props: {
        input: Object,
        focused: Boolean,
    },

    data: () => ({
        timer: null,
        isFn: false,
        result: '',

        Tooltip,
    }),

    watch: {
        'input.updateIntervalSeconds': function () {
            this.teardownTimer();
            this.setupTimer();
        },
        'input.script': function () {
            this.teardownTimer();
            this.updateFnInputs();
            this.setupTimer();
        },
        'input.fnInputs': {
            handler: function () {
                this.evalScript();
                this.$emit('updated');
            },
            deep: true,
        },
    },

    mounted: function () {
        this.updateFnInputs();
        this.setupTimer();
    },

    beforeDestroy: function () {
        this.teardownTimer();
    },

    methods: {

        setupTimer: function () {
            if (this.input.updateIntervalSeconds > 0) {
                this.timer = setInterval(() => {
                    this.evalScript();
                }, this.input.updateIntervalSeconds * 1000);
            }
            else {
                this.timer = null;
            }

            this.evalScript();
        },
        teardownTimer: function () {
            if (this.timer) clearInterval(this.timer);
        },

        updateFnInputs: function () {

            let result
            
            try {
                result = eval(this.input.script);
            } catch (e) {
                result = 'error';
            }

            if (typeof result === 'function') {
                const names = $args(result);

                this.isFn = names.length > 0;

                if (this.input.fnInputs.map(it => it.name) !== names) {
                    this.input.fnInputs = names.map((name, i) => ({
                        name,
                        value: this.input.fnInputs[i].value || ''
                    }));
                }
            }
            else if (result !== 'error') {
                this.input.fnInputs = [];
            }
        },

        evalScript: function () {
            try {
                const evaluatedScript = eval(this.input.script);

                if (this.isFn) {
                    const args = this.input.fnInputs.map(it => $valueify(it.value));
                    this.result = evaluatedScript(...args).toString();
                }
                else {
                    this.result = evaluatedScript.toString();
                }
            } catch (error) {
                this.result = error.message;
            }
        },

        showTooltip: function (el) {
            Tooltip.showAtElement(el, { html: questionTooltip });
        },
    }
});