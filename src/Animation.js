var Game = Game || {};

Game.Animation = {};

Game.Animation.Move = function(game, fromX, fromY, toX, toY, duration, callback) {
    var self = this;
    
    var steps = Math.round(duration / game.refreshInterval);
    if (steps < 1) {
        steps = 1;
    }
    var movementX = Game.Animation.getDelta(fromX, toX) / steps;
    var movementY = Game.Animation.getDelta(fromY, toY) / steps;
    
    game.on("refresh", function(e, sender, eventHandler) {
        if (steps--) {
            fromX = Math.min(fromX, toX) + movementX;
            fromY = Math.min(fromY, toY) + movementY;
            callback(fromX, fromY);
            console.log(steps, fromX, fromY, movementX, movementY);
        } else {
            callback(toX, toY);
            eventHandler.clear();
        }
    });
};

Game.Animation.getDelta = function (n1, n2) {
    return Math.max(n1, n2) - Math.min(n1, n2);
};