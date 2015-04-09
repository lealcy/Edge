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
        game.sendEvent("mouseWheel", event);
        if (event.wheelDirection == Game.MOUSE_WHEEL_UP) {
            game.sendEvent("mouseWheelUp", event);
        } else if (event.wheelDirection == Game.MOUSE_WHEEL_DOWN) {
            game.sendEvent("mouseWheelDown", event);
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
            game.sendEvent("mouseClick", event);
            switch (mouseButtonPressed) {
                case Game.MOUSE_LEFT:
                    game.sendEvent("mouseLeftClick", event);
                    break;
                case Game.MOUSE_CENTER:
                    game.sendEvent("mouseCenterClick", event);
                    break;
                case Game.MOUSE_RIGHT:
                    game.sendEvent("mouseRightClick", event);
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
            originX = self.event.x - mouseOldX;
            originY = self.event.y - mouseOldY;
            self.event.originX = originX;
            self.event.originY = originY;
            self.event.button = mouseButtonPressed;
            if (originX > 0) {
                originX = 0;
            }
            if (originY > 0) {
                originY = 0;
            }
            game.sendEvent("mouseDrag", event);
        } else {
            game.sendEvent("mouseMove", event);
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