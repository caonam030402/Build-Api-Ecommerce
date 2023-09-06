"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
let notificationCount = 0;
__1.io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('count', notificationCount);
    socket.on('increment', () => {
        notificationCount++;
        __1.io.emit('count', notificationCount);
    });
    socket.on('reset', () => {
        notificationCount = 0;
        __1.io.emit('count', notificationCount);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
