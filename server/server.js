var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({port: 8080});
var Promise = require('bluebird');
var Game = require('./Game');
var ChatRoom = require('./ChatRoom');
var uuid = require('node-uuid');

var chatRoom = new ChatRoom(server);

server.broadcast = function(message) {
    for (var i in server.clients) {
        server.clients[i].send(message);
    }
};

server.on('connection', function(socket) {
    chatRoom.addPlayerSocket(socket);
});
