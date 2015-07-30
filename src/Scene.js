var Edge = Edge || {};

Edge.Scene = function(game) {
    var self = this;

    var layers = [];
    var refreshEvent = null;

    self.addEntity = function(entity, layer) {
        layer = layer || 0;
        if (layers[layer] === undefined) {
            layers[layer] = [];
        }
        layers[layer].push(entity);
    };

    self.start = function() {
        if (refreshEvent === null) {
            refreshEvent = game.on("game.refresh", refresh, self);
        }
    };

    self.stop = function() {
        if (refreshEvent !== null) {
            refreshEvent.clear();
            refreshEvent = null;
        }
    };

    function refresh()
    {
        for (var i = 0, j = layers.length; i < j; i++) {
            for (var k = 0, w = layers[i].length; k < w; k++) {
                if (layers[i][k].isVisible) {
                    layers[i][k].refresh(self);
                }
            }
        }
    }

};
