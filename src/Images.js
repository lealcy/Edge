var Game = Game || {};

Game.Images = function(game, images){
    var self = this;
    
    var loadedImages = {};
    var imagesLoaded = 0;


    if (!images.length || imagesLoaded) {
        game.event(self, "imagesLoaded", imagesLoaded);
    } else {
        for (var name in images) {
            if (images.hasOwnProperty(name)) {
                var img = new Image();
                loadedImages[name] = img;
                img.onload = function(e) {
                    if (++imagesLoaded == images.length) {
                        game.event(self, "imagesLoaded", imagesLoaded);
                    }
                };
                img.src = images[name];
            }
        }
    }
    
    self.get = function(name) {
        if (loadedImages.hasOwnProperty(name)) {
            return loadedImages[name];
        }
    };
};