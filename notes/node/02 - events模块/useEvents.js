var myEvents = require('./myEvents.js')

var ev = new myEvents()

function hello1 () {
	console.log('hello1')
}

function hello2 () {
	console.log('hello2')
}

ev.once('hello1', hello1)
ev.addListener('hello2', hello2)


ev.removeListener('hello2', hello2)

setTimeout(() => {
	ev.emit('hello2')
}, 1000)

ev.emit('hello1')
ev.emit('hello1')

//ev.removeListener('hello', hello);

/*setTimeout(() => {
	ev.triggerEvent('hello');
}, 1000);*/

/*
const EventEmitter = require("events");
class MyEvents extends EventEmitter{
	constructor () {
		super();
	}
}

const myEmitter =  new MyEvents();
myEmitter.on('hello', (username) => {
	console.log(username);
});


myEmitter.emit("hello","Mike");*/
