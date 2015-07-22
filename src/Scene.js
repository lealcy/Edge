var Edge = Edge || {};

Edge.Scene = function(game) {
    var self = this;

    var entities = [];
    var refreshEvent = null;

    self.addEntity = function(entity) {
        entities.push(entity);
    };

    self.start = function() {
        if (refreshEvent === null) {
            refreshEvent = game.on("game.refresh", render, self);
        }
    };

    self.stop = function() {
        refreshEvent.clear();
        refreshEvent = null;
    };

    function render()
    {
        entities.sort(function(a, b) { return a.layer - b.layer; });
        for (var i = 0, j = entities.length; i < j; i++) {
            if (!entities[i].isVisible) {
                continue;
            }
            var entity = entities[i];
            if (entity.image) {
                game.context.drawImage(entity.image, entity.x, entity.y);
            }
            entity.onRefresh();
        }
    }


};
