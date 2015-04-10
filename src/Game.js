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
    /*if (typeof Keyboard !== "undefined") { 
        self.keyboard = new Keyboard(); // temporary
    }*/
    
    if (imageList.length && typeof Game.Images !== "undefined") {
        self.images = new Game.Images(self, imageList);
    }

    self.start = function() {
        if (imageList.length && typeof Game.Images !== "undefined") {
            self.on(self, "imagesLoaded", function() {
                start();
            });
        } else {
            start();
        }
    };

    self.on = function(receiver, eventName, callback) {
        if (!eventReceivers.hasOwnProperty(eventName)) {
            eventReceivers[eventName] = [];
        }
        eventReceivers[eventName].push({
            receiver: receiver, 
            callback: callback,
        });
    };
    
    self.event = function(sender, eventName, eventObj) {
        if (eventReceivers.hasOwnProperty(eventName)) {
            for (var i = 0, len = eventReceivers[eventName].length; i < len; i++) {
                eventReceivers[eventName][i].callback(sender, eventObj);
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
        self.event(self, "refresh");
        if (running) {
            setTimeout(refresh, refreshInterval);
        }
    }
    
    function tick()
    {
        self.event(self, "tick");
        if (running) {
            setTimeout(tick, tickInterval);
        }
    }
    
    
};


