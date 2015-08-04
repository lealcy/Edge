var Edge = Edge || {};

Edge.Images = function(game, images) {
    var self = this;

    var loadedImages = {};
    var imagesLoaded = 0;

    function imageOnLoadEvent(e, name) 
    {
        game.event("images.imageLoaded", {name: name, loaded: imagesLoaded}, 
            self);
        if (++imagesLoaded == images.length) {
            game.event("images.allImagesLoaded", {total: imagesLoaded}, self);
        }
    }

    if (!images.length) {
        game.event("images.allImagesLoaded", imagesLoaded);
    } else {
        
        for (var name in images) {
            if (images.hasOwnProperty(name)) {
                var img = new Image();
                loadedImages[name] = img;
                img.onload = imageOnLoadEvent;
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
