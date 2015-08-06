var Edge = Edge || {};

Edge.debug = false;
Edge.debugLevel = 1;

Edge.Game = function(canvasElement) {
    var self = this;

    self.canvas = canvasElement;
    self.context = canvasElement.getContext("2d"); // temporary
    self.tickInterval = 1000 / 15;
    self.refreshInterval = 1000 / 60;
    self.clearBeforeRefresh = true;
    self.focusOnStart = true;
    self.refreshCount = 0;
    self.tickCount = 0;

    var running = false;
    var eventReceivers = {};

    var requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, self.refreshInterval);
        };

    self.start = function() {
        running = true;

        game.canvas.tabIndex = 1; // Force canvas to be a "focusable" object.
        game.canvas.style.outline = "none"; // Disable the focus outline.

        if (self.focusOnStart) {
           game.canvas.focus();
        }

        setTimeout(tick, self.tickInterval);
        setTimeout(refresh, self.refreshInterval);
        self.event("game.start", self, self);
    };

    self.stop = function() {
        game.event("game.stop", self, self);
        running = false;
    };

    self.isRunning = function() {
        return running;
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
        if (running && eventReceivers.hasOwnProperty(eventName)) {
            for (var i = 0, len = eventReceivers[eventName].length;
                i < len; i++) {
                if (eventReceivers[eventName][i]) {
                    eventReceivers[eventName][i].callback(eventObj, sender,
                        eventReceivers[eventName][i].handler);
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

    var requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, self.refreshInterval);
        };

    function refresh()
    {
        if (running) {
            requestAnimFrame(refresh);
            if (self.clearBeforeRefresh) {
                self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
            }
            self.event("game.refresh", self, self);
            self.refreshCount++;
        }
    }

    function tick()
    {
        if (running) {
            setTimeout(tick, self.tickInterval);
            self.event("game.tick", self, self);
            self.tickCount++;
        }
    }
};

Edge.log = function() {
    if (Edge.debug && arguments[0] <= Edge.debugLevel) {
        console.log(Array.prototype.slice.call(arguments, 1));
    }
};
