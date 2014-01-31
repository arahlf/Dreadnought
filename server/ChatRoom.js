function ChatRoom(server) {
    this.server = server;
}

ChatRoom.prototype.addPlayerSocket = function(playerSocket) {
    this.server.broadcast('Player has joined the chat.');

    playerSocket.on('message', (function(message) {
        this.server.broadcast('[Player]: ' + message);
    }).bind(this));
}

module.exports = ChatRoom;
