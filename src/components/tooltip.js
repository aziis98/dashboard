
const SOME_MARGIN = 4;
const positionRectMapper = {
    'bottom-center': (rect) => ({
        x: rect.left + rect.width * 0.5,
        y: rect.top + rect.height + SOME_MARGIN,   
    }),
    'center-left': (rect) => ({
        x: rect.left - SOME_MARGIN,
        y: rect.top + rect.height * 0.5,   
    }),
};

const Tooltip = new Vue({
    el: '#tooltip',

    data: {
        isShown: false,
        x: 400, y: 400,

        message: 'Tooltip di prova',
        position: 'bottom-center',
    },

    methods: {

        showAtPosition: function (x, y, message, position = 'bottom-center') {
            this.isShown = true;
            this.message = message;
            this.x = x;
            this.y = y;
        },
        showAtElement: function (element, message, position = 'bottom-center') {
            const bounds = element.getBoundingClientRect();
            const { x, y } = positionRectMapper[position](bounds);

            this.showAtPosition(x, y, message, position);
        },

        show: function(element, message, position = 'bottom-center') {
            this.showAtElement(element, message, position);
        },

        hide: function () {
            this.isShown = false;
        }
        
    },
});

window.Tooltip = Tooltip;