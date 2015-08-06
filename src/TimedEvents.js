var Edge = Edge || {};

Edge.After = function(game, delay, eventName, eventObj, sender) {
    var self = this;

    function event()
    {
        game.event(eventName, eventObj, sender);
    }

    var timer = setTimeout(event, delay);

    self.reset = function(newDelay) {
        clearTimeout(timer);
        delay = newDelay || delay;
        timer = setTimeout(event, delay);
    };

    self.now = function() {
        clearTimeout(timer);
        event();
    };

    self.stop = function() {
        clearTimeout(timer);
    };
};

Edge.Every = function(game, interval, eventName, eventObj, sender, stopEvent) {
    var self = this;
    var timer = null;

    if (typeof stopEvent !== "undefined") {
        game.on(stopEvent, function() {
            self.stop();
        }, self);
    }

    function event()
    {
        game.event(eventName, eventObj, sender);
    }

    function iterate() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            event();
            iterate();
        }, interval);
    }

    self.start = function() {
        if (!timer) {
            iterate();
        }
    };

    self.reset = function() {
        self.stop();
        self.start();
    };

    self.stop = function () {
        clearTimeout(timer);
        timer = null;
    };

    self.changeInterval = function(newInterval) {
        interval = newInterval;
    };

    self.now = function() {
        event();
    };

    iterate();
};
