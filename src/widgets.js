
function generateUID() {
    return 'widget-' + Math.floor(Math.random() * Math.pow(16, 10)).toString(16).padStart(10, '0');
}

const factories = {
    
    'note': ({align}) => ({
        note: "I'm a note!",
        align,
    }),

    'dynamic': () => ({
        script: '',
        result: '',

        updateEvery: 1,
    }),

};

function createWidget(pan, type, opts) {

    return Object.assign({
        
        uid: generateUID(),
        location: {
            x: -pan.x + innerWidth * 0.5,
            y: -pan.y + innerHeight * 0.5,
        },
        type,

    }, factories[type](opts));
}

export default {
    createWidget,
}