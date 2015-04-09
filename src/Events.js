var Game = Game || {};

Game.Events = (function() {
    var receivers = {};
    
    return {
        receive: function(eventName, callback) {
            if (!receivers.hasOwnProperty(eventName)) {
                receivers[eventName] = [];
            }
            receivers[eventName].push(callback);
        },
        send: function(eventName, eventObj) {
            if (receivers.hasOwnProperty(eventName)) {
                for (var i = 0, len = receivers.length; i < len; i++) {
                    receivers[eventName][i](eventObj);
                }
                
            }
        },    
    };
}());