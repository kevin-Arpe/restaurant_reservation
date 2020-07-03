exports.onToggle = () => {
    const events = require('events');
    const eventEmitter = new events.EventEmitter();

    eventEmitter.on('click', onToggle = () => {
        console.log("clicked");
    });
    
    eventEmitter.emit('click');
    //THIS FUNCTION IS NOT WORKING FOR WHEN I WANT
}