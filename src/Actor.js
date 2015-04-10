var Game = Game || {};

Game.Actor = function(game) {
    var self = this;
    
    self.x = game.canvas.width / 2;
    self.y = game.canvas.height / 2.
    self.width = game.canvas.width / 20;
    self.height = game.canvas.height / 20;
    
    self.on = function(eventName, callback) {
        game.on(eventName, function(eventObj, sender) {
            callback(self, eventObj, sender);
        }, self);
    };
    
    
};