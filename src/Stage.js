var Game = Game || {};

Game.Stage = function() {
    var self = this;

    self.images = {};
    self.keys = [];

    self.onEnter = function() { };
    self.onTick = function() { };
    self.onRefresh = function() { };
    self.onExit = function() { };
    self.onMouseWheelUp = function() { };
    self.onMouseWheelDown = function() { };
    self.onMouseLeft = function() { };
    self.onMouseCenter = function() { };
    self.onMouseRight = function() { };
    self.onMouseDrag = function() { };
    self.onMouseDown = function() { };
    self.onMouseMove = function() { };
    
    self.enter = function(game) {
        if (typeof Game.Sprites !== "undefined" && images.length) {
            self.sprites = new Game.Sprites();
            self.sprites.init(images, function() {
                self.onEnter();
            });
        } else {
            self.onEnter();
        }
    };
    
    self.exit = function() {
        if (self.sprites) {
            delete self.sprites;
        }
    };
    
    self.tick = function() {
        self.onTick();
    };
    
    self.refresh = function() {
        self.onRefresh();
    };
};