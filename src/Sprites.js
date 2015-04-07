function Sprites()
{
    var self = this;
    
    var sprites = {};

    self.init = function(images, callback) {
        if (!images.length) {
            callback();
        } else {
            var imagesLoaded = 0;
            for (var name in images) {
                if (images.hasOwnProperty(name)) {
                    var img = new Image();
                    sprites[name] = img;
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
}