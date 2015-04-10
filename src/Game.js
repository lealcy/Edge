var Game = Game || {};

Game.Game = function(canvasElement, imageList) {
    var self = this;

    self.canvas = canvasElement;
    self.context = canvasElement.getContext("2d"); // temporary

    var tickInterval = 1000 / 15;
    var refreshInterval = 1000 / 60;
    var running = false;
    var eventReceivers = {};

    if (typeof Game.Mouse !== "undefined") {
        var mouse = new Game.Mouse(self);
    }
    if (typeof Game.Keyboard !== "undefined") { 
        var keyboard = new Game.Keyboard(self);
    }
    if (imageList.length && typeof Game.Images !== "undefined") {
        self.images = new Game.Images(self, imageList);
    }

    self.start = function() {
        if (imageList.length && typeof Game.Images !== "undefined") {
            self.on("imagesLoaded", function() { start(); });
        } else {
            start();
        }
    };

    self.on = function(eventName, callback, receiver) {
        if (!eventReceivers.hasOwnProperty(eventName)) {
            eventReceivers[eventName] = [];
        }
        eventReceivers[eventName].push({
            receiver: receiver, 
            callback: callback,
        });
    };
    
    self.event = function(eventName, eventObj, sender) {
        if (eventReceivers.hasOwnProperty(eventName)) {
            for (var i = 0, len = eventReceivers[eventName].length; i < len; i++) {
                eventReceivers[eventName][i].callback(eventObj, sender);
            }
            return true;
        }
        return false;
    };
    
    function start()
    {
        running = true;
        setTimeout(tick, tickInterval);
        setTimeout(refresh, refreshInterval);
        self.event(self, "start");

    }
    
    function refresh()
    {
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.event("refresh");
        if (running) {
            setTimeout(refresh, refreshInterval);
        }
    }
    
    function tick()
    {
        self.event("tick");
        if (running) {
            setTimeout(tick, tickInterval);
        }
    }
};


