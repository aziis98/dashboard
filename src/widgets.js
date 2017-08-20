
function generateUID() {
    return 'widget-' + Math.floor(Math.random() * Math.pow(16, 10)).toString(16).padStart(10, '0');
}

const factories = {
    
    'note': ({
        note = "I'm a note!",
        align = 'left',
    }) => ({
        note, align,
    }),

    'dynamic': ({
        script = "'I\\'m a new Dynamic! See: ' + Math.floor(Math.random() * 10)",
        updateIntervalSeconds = 0.1, 
    }) => ({
        script, updateIntervalSeconds,
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
        focused: false,

    }, factories[type](opts));
}

export default {
    createWidget,
}