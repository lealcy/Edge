var Game = Game || {};

Game.Entity = function(x, y, layer, isVisible, image) {
        var self = this;

        self.isVisible = isVisible || true;
        self.x = x || 0;
        self.y = y || 0;
        self.image = image || null;
        self.layer = layer || 0;
        
        self.onRefresh = function() {};


};
