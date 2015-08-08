var Edge = Edge || {};

Edge.Entity = function(x, y, isVisible, image) {
    var self = this;

    self.x = x || 0;
    self.y = y || 0;
    self.isVisible = isVisible || true;
    self.image = image || null;

    self.onRefresh = function(scene) {};

    self.refresh = function(scene) {
        if (self.image) {
            game.context.drawImage(self.image, self.x, self.y);
        }
        self.onRefresh(scene);
    };
};
