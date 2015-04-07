function MouseEvent(e)
{
    var self = this;
    
    self.rawEvent = e;
    self.wheelDirection = e.wheelDelta / 120;
    self.button = e.button;
    self.x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
    self.y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;
    self.originX = 0;
    self.originY = 0;
}

function Mouse(engine)
{
    var self = this;
    
    self.NONE = -1;
    self.LEFT = 0;
    self.CENTER = 1;
    self.RIGHT = 2;
    self.WHEEL_UP = 1;
    self.WHEEL_DOWN = -1;
    self.WHEEL_NONE = 0;
    self.event = null;
    
    var isMouseDown = false;
    var mouseButtonPressed = self.MOUSE_NONE;
    var mouseMoved = false;
    var mouseOldX = 0;
    var mouseOldY = 0;
    var originX = 0;
    var originY = 0;
    
    engine.canvas.onmousedown = onMouseDown;
    engine.canvas.onmouseup = onMouseUp;
    engine.canvas.onmousemove = onMouseMove;
    engine.canvas.onmousewheel = onMouseWheel;
    engine.canvas.onmouseout = onMouseOut;
    engine.canvas.oncontextmenu = function() { return false; };
    
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
        self.event = new MouseEvent(e);
        if (engine.getCurrentStage()) {
            if (self.event.wheelDirection == self.WHEEL_UP) {
                engine.getCurrentStage().onMouseWheelUp();
            } else if (self.event.wheelDirection == self.WHEEL_DOWN) {
                engine.getCurrentStage().onMouseWheelDown();
            }
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
            self.event = new MouseEvent(e);
            self.event.x -= originX;
            self.event.y -= originY;
            self.event.button = mouseButtonPressed;
            if (engine.getCurrentStage()) {
                switch (mouseButtonPressed) {
                    case self.LEFT:
                        engine.getCurrentStage().onMouseLeft();
                        break;
                    case self.CENTER:
                        engine.getCurrentStage().onMouseCenter();
                        break;
                    case self.RIGHT:
                        engine.getCurrentStage().onMouseRight();
                        break;
                }
            }
        }
        mouseMoved = false;
        isMouseDown = false;
        mouseButtonPressed = self.NONE;
        return false;
    }

    function onMouseOut(e)
    {
        onMouseUp(e);
    }
    
    function onMouseMove(e)
    {
        self.event = new MouseEvent(e);
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
            if (engine.getCurrentStage()) {
                engine.getCurrentStage().onMouseDrag();
            }
        } else {
            if (engine.getCurrentStage()) {
                engine.getCurrentStage().onMouseMove();
            }
        }
        return false;
    }
}
