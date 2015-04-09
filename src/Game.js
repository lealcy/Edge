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
    
    self.images = new Game.Images(imageList);

    self.start = function() {
        self.images.init(imageList, function() {
            running = true;
            setTimeout(tick, tickInterval);
            setTimeout(refresh, refreshInterval);
            self.sendEvent("start");
        });
    };

    self.receiveEvent = function(eventName, callback) {
        if (!eventReceivers.hasOwnProperty(eventName)) {
            eventReceivers[eventName] = [];
        }
        eventReceivers[eventName].push(callback);
    };
    
    self.sendEvent = function(eventName, eventObj) {
        if (eventReceivers.hasOwnProperty(eventName)) {
            for (var i = 0, len = eventReceivers[eventName].length; i < len; i++) {
                eventReceivers[eventName][i](eventObj);
            }
            return true;
        }
        return false;
    };
    
    function refresh()
    {
        self.sendEvent("refresh");
        if (running) {
            setTimeout(refresh, refreshInterval);
        }
    }
    
    function tick()
    {
        self.sendEvent("tick");
        if (running) {
            setTimeout(tick, tickInterval);
        }
    }
    
    
};


