var Game = Game || {};

Game.Images = function(){
    var self = this;
    
    var loadedImages = {};
    var imagesLoaded = 0;

    self.init = function(images, callback) {
        if (!images.length || imagesLoaded) {
            callback();
        } else {
            for (var name in images) {
                if (images.hasOwnProperty(name)) {
                    var img = new Image();
                    loadedImages[name] = img;
                    img.onload = function(e) {
                        if (++imagesLoaded == images.length) {
                            callback();
                        }
                    };
                    img.src = images[name];
                }
            }
        }
    };
    
    self.get = function(name) {
        if (loadedImages.hasOwnProperty(name)) {
            return loadedImages[name];
        }
    };
};