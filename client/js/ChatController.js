angular.module('Dreadnought', [])
    .controller('ChatController', ['$scope', function($scope) {
        $scope.messages = ['Connecting to chat...'];

        var displayMessage = function(message) {
            var digestInProgress = $scope.$$phase !== null;

            if (digestInProgress) {
                    $scope.messages.push(message);
            }
            else {
                $scope.$apply(function() {
                    $scope.messages.push(message);
                });
                
            }
        };

        var socket = new WebSocket('ws://' + window.location.host + ':8080');

        socket.onopen = function() {
            displayMessage('Connected to chat.');
        };

        socket.onmessage = function(event) {
            displayMessage(event.data);
        };

        socket.onerror = function() {
            displayMessage('Network error ocurred.');
        };

        socket.onclose = function() {
            displayMessage('Disconnected from chat.');
        };

        $scope.sendMessage = function() {
            if ($scope.message) {
                if (socket.readyState === socket.OPEN) {
                    socket.send($scope.message);
                }
                else {
                    displayMessage('You are not connected to chat.');
                }

                $scope.message = '';
            }
        };
    }]);
