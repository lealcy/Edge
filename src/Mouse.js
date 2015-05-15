var Game = Game || {};

Game.Mouse = function(game) {
    var self = this;
    
    game.canvas.onmousedown = onMouseDown;
    game.canvas.onmouseup = onMouseUp;
    game.canvas.onmousemove = onMouseMove;
    game.canvas.onmousewheel = onMouseWheel;
    game.canvas.onmouseout = onMouseOut;
    game.canvas.oncontextmenu = function() { return false; };
    
    var initialEvent = false;
    
    function processEvent(e)
    {
        return {
            button: e.button,
            x: e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX,
            y: e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY,
            wheelDirection: e.wheelDelta / 120,
            DOMMouseEvent: e,
        };
    }
    
    function onMouseWheel(e)
    {
        e = processEvent(e);
        game.event("mouseWheel", e);
        if (event.wheelDirection == Game.MOUSE_WHEEL_UP) {
            game.event("mouseWheelUp", e);
        } else if (event.wheelDirection == Game.MOUSE_WHEEL_DOWN) {
            game.event("mouseWheelDown", e);
        }
        return false;
    }
    
    function onMouseDown(e)
    {
        e = processEvent(e);
        
        // for the mouse drag
        initialEvent = e;
        initialEvent.dragX = e.x;
        initialEvent.dragY = e.y;

        game.event("mouseDown", e);
        return false;
    }
    
    function onMouseUp(e)
    {
        e = processEvent(e);
        game.event("mouseUp", e);
        if (initialEvent) {
            if (initialEvent.x == e.x && initialEvent.y == e.y) { // Mouse didn't move
                game.event("mouseClick", e);
                switch (e.button) {
                    case Game.MOUSE_LEFT: 
                        game.event("mouseLeftClick", e); 
                        break;
                    case Game.MOUSE_CENTER: 
                        game.event("MouseCenterClick", e); 
                        break;
                    case Game.MOUSE_RIGHT: 
                        game.event("MouseRightClick", e); 
                        break;
                }
            } else {
                e.origin = initialEvent;
                game.event("mouseEndDrag", e);
            }
        } else {
            game.log("mouseUp without mouseDown");
        }
        initialEvent = false;
        return false;
    }

    function onMouseOut(e)
    {
        game.event("mouseOut", processEvent(e));
        if (initialEvent) {
            onMouseUp(e);
        }
    }
    
    function onMouseMove(e)
    {
        e = processEvent(e);
        if (initialEvent) {
            e.origin = initialEvent;
            game.event("mouseDrag", e);
            initialEvent.dragX = e.x;
            initialEvent.dragY = e.y;
        };
        game.event("mouseMove", e);
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