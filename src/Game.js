var Game = Game || {};

Game.debug = false;
Game.debugLevel = 1;

Game.Game = function(canvasElement) {
    var self = this;

    self.canvas = canvasElement;
    self.context = canvasElement.getContext("2d"); // temporary
    self.tickInterval = 1000 / 15;
    self.refreshInterval = 1000 / 60;

    var running = false;
    var eventReceivers = {};

    self.start = function() {
        running = true;
        setTimeout(tick, self.tickInterval);
        setTimeout(refresh, self.refreshInterval);
        self.event("game.start", self, self);
    };

    self.on = function(eventName, callback, receiver) {
        if (!eventReceivers.hasOwnProperty(eventName)) {
            eventReceivers[eventName] = [];
        }
        var eventId = eventReceivers[eventName].push({
            callback: callback,
        }) - 1;

        eventReceivers[eventName][eventId].handler = {
            name: eventName,
            callback: callback,
            receiver: receiver,
            clear: function() {
                delete eventReceivers[eventName][eventId];
            },
        };

        return eventReceivers[eventName][eventId].handler;
    };

    self.event = function(eventName, eventObj, sender) {
        if (eventReceivers.hasOwnProperty(eventName)) {
            for (var i = 0, len = eventReceivers[eventName].length;
                i < len; i++) {
                if (eventReceivers[eventName][i]) {
                    eventReceivers[eventName][i].callback(
                        eventObj, sender, eventReceivers[eventName][i].handler
                    );
                }
            }
            return true;
        }
        return false;
    };

    self.clearEvent = function(eventName) {
        if (eventReceivers.hasOwnProperty(eventName)) {
            delete eventReceivers[eventName];
        }
    };

    function refresh()
    {
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.event("game.refresh", self, self);
        if (running) {
            setTimeout(refresh, self.refreshInterval);
        }
    }

    function tick()
    {
        self.event("game.tick", self, self);
        if (running) {
            setTimeout(tick, self.tickInterval);
        }
    }
};

Game.log = function() {
    if (Game.debug && arguments[0] <= Game.debugLevel) {
        console.log(Array.prototype.slice.call(arguments, 1));
    }
};
