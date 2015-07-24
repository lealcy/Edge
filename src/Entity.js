var Edge = Edge || {};

Edge.Entity = function(x, y, z, isVisible, image) {
        var self = this;

        self.x = x || 0;
        self.y = y || 0;
        self.z = z || 0;
        self.isVisible = isVisible || true;
        self.image = image || null;

        self.onRefresh = function() {};


};
