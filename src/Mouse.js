var Game = Game || {};

Game.MouseEvent = function(e) {
    var self = this;
    
    self.rawEvent = e;
    self.wheelDirection = e.wheelDelta / 120;
    self.button = e.button;
    self.x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
    self.y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;
    self.originX = 0;
    self.originY = 0;
};

Game.Mouse = function(game) {
    var self = this;
    
    var isMouseDown = false;
    var mouseButtonPressed = Game.MOUSE_NONE;
    var mouseMoved = false;
    var mouseOldX = 0;
    var mouseOldY = 0;
    var originX = 0;
    var originY = 0;
    
    game.canvas.onmousedown = onMouseDown;
    game.canvas.onmouseup = onMouseUp;
    game.canvas.onmousemove = onMouseMove;
    game.canvas.onmousewheel = onMouseWheel;
    game.canvas.onmouseout = onMouseOut;
    game.canvas.oncontextmenu = function() { return false; };
    
    
    function translateEventX(e) 
    {
        return e.offsetX === undefined ? 
            e.originalEvent.layerX : e.offsetX;
    }
    
    function translateEventY(e)
    {
        return e.offsetY === undefined ? 
            e.originalEvent.layerY : e.offsetY;
    }
    
    function onMouseWheel(e)
    {
        var event = new Game.MouseEvent(e);
        game.event(self, "mouseWheel", event);
        if (event.wheelDirection == Game.MOUSE_WHEEL_UP) {
            game.event(self, "mouseWheelUp", event);
        } else if (event.wheelDirection == Game.MOUSE_WHEEL_DOWN) {
            game.event(self, "mouseWheelDown", event);
        }
        return false;
    }
    
    function onMouseDown(e)
    {
        isMouseDown = true;
        mouseMoved = false;
        mouseButtonPressed = e.button;
        mouseOldX = translateEventX(e) - originX;
        mouseOldY = translateEventY(e) - originY;
        return false;
    }
    
    function onMouseUp(e)
    {
        if (!mouseMoved) {
            var event = new Game.MouseEvent(e);
            event.x -= originX;
            event.y -= originY;
            event.button = mouseButtonPressed;
            game.event(self, "mouseClick", event);
            switch (mouseButtonPressed) {
                case Game.MOUSE_LEFT:
                    game.event(self, "mouseLeftClick", event);
                    break;
                case Game.MOUSE_CENTER:
                    game.event(self, "mouseCenterClick", event);
                    break;
                case Game.MOUSE_RIGHT:
                    game.event(self, "mouseRightClick", event);
                    break;
            }
        }
        mouseMoved = false;
        isMouseDown = false;
        mouseButtonPressed = Game.MOUSE_NONE;
        return false;
    }

    function onMouseOut(e)
    {
        onMouseUp(e);
    }
    
    function onMouseMove(e)
    {
        var event = new Game.MouseEvent(e);
        if (isMouseDown) {
            mouseMoved = true;
            originX = event.x - mouseOldX;
            originY = event.y - mouseOldY;
            event.originX = originX;
            event.originY = originY;
            event.button = mouseButtonPressed;
            if (originX > 0) {
                originX = 0;
            }
            if (originY > 0) {
                originY = 0;
            }
            game.event(self, "mouseDrag", event);
        } else {
            game.event(self, "mouseMove", event);
        }
        return false;
    }
};

Game.MOUSE_NONE = -1;
Game.MOUSE_LEFT = 0;
Game.MOUSE_CENTER = 1;
Game.MOUSE_RIGHT = 2;
Game.MOUSE_WHEEL_UP = 1;
Game.MOUSE_WHEEL_DOWN = -1;
Game.MOUSE_WHEEL_NONE = 0;