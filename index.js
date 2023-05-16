const logEvents = require("./logEvents")
const EventEmmiter = require("events")

class MyEmitter extends EventEmmiter {}

// Initialize object
const myEmitter = new MyEmitter();

// Add listener to Event
myEmitter.on('log', (msg) => {
    logEvents(msg)
})

setTimeout(() => {
// Emit Event
myEmitter.emit('log', "Hi, My Name is Pabi")
}, 2000)