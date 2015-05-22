var Game = Game || {};

Game.After = function(game, delay, eventName, eventObj, sender) {
    var self = this;
    
    var timer = setTimeout(function() { 
        game.event(eventName, eventObj, sender);
    }, delay);
    
    self.reset = function(newDelay) {
        clearTimeout(timer);
        delay = newDelay || delay;
        timer = setTimeout(function() {
            game.event(eventName, eventObj, sender);
        }, delay);

    };
    
    self.now = function() {
        clearTimeout(timer);
        game.event(eventName, eventObj, sender);
    };
        
    self.stop = function() { 
        clearTimeout(timer); 
    };
};

Game.Every = function(game, interval, eventName, eventObj, sender) {
    var self = this;
    
    var timer = null;
    
    function iterate() {
        timer = setTimeout(function() { 
            game.event(eventName, eventObj, sender); 
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
        game.event(eventName, eventObj, sender);
    };
    
    iterate();
};