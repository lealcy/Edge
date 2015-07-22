var Edge = Edge || {};

Edge.Mouse = function(game) {
    var self = this;

    self.ignoreInput = false;
    self.noMoveEventOnDrag = false; // Disable mouse.move events when dragging

    game.canvas.onmousedown = onMouseDown;
    game.canvas.onmouseup = onMouseUp;
    game.canvas.onmousemove = onMouseMove;
    game.canvas.onmousewheel = onMouseWheel;
    game.canvas.onmouseout = onMouseOut;
    game.canvas.oncontextmenu = onContextMenu;

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
        if (!self.ignoreInput) {
            e = processEvent(e);
            game.event("mouse.wheel", e, self);
            if (event.wheelDirection == Edge.MOUSE_WHEEL_UP) {
                game.event("mouse.wheelUp", e, self);
            } else if (event.wheelDirection == Edge.MOUSE_WHEEL_DOWN) {
                game.event("mouse.wheelDown", e, self);
            }
            return false;
        }
    }

    function onMouseDown(e)
    {
        if (!self.ignoreInput) {
            e = processEvent(e);

            // for the mouse drag
            initialEvent = e;
            initialEvent.dragX = e.x;
            initialEvent.dragY = e.y;
            initialEvent.beginDrag = true;

            game.event("mouse.down", e, self);
            return false;
        }
    }

    function onMouseUp(e)
    {
        if (!self.ignoreInput) {
            e = processEvent(e);
            game.event("mouse.up", e, self);
            if (initialEvent) {
                if (initialEvent.x == e.x && initialEvent.y == e.y) { // didn't move
                    game.event("mouse.click", e, self);
                    switch (e.button) {
                        case Edge.MOUSE_LEFT:
                            game.event("mouse.leftClick", e, self);
                            break;
                        case Edge.MOUSE_CENTER:
                            game.event("mouse.centerClick", e, self);
                            break;
                        case Edge.MOUSE_RIGHT:
                            game.event("mouse.rightClick", e, self);
                            break;
                    }
                } else {
                    e.origin = initialEvent;
                    game.event("mouse.endDrag", e, self);
                }
            } else {
                game.log("mouseUp without mouseDown");
            }
            initialEvent = false;
            return false;
        }
    }

    function onMouseOut(e)
    {
        if (!self.ignoreInput) {
            game.event("mouse.out", processEvent(e), self);
            if (initialEvent) {
                onMouseUp(e);
            }
        }
    }

    function onMouseMove(e)
    {
        if (!self.ignoreInput) {
            e = processEvent(e);
            if (initialEvent) {
                e.origin = initialEvent;
                if (initialEvent.beginDrag) {
                    game.event("mouse.beginDrag", e, self);
                    initialEvent.beginDrag = false;
                }
                game.event("mouse.drag", e, self);
                initialEvent.dragX = e.x;
                initialEvent.dragY = e.y;
                if (self.noMoveEventOnDrag) {
                    return false;
                }
            };
            game.event("mouse.move", e, self);
            return false;
        }
    }

    function onContextMenu(e)
    {
        if (!self.ignoreInput) {
            game.event("mouse.contextMenu", processEvent(e), self);
            return false;
        }
    }
};

Edge.MOUSE_NONE = -1;
Edge.MOUSE_LEFT = 0;
Edge.MOUSE_CENTER = 1;
Edge.MOUSE_RIGHT = 2;
Edge.MOUSE_WHEEL_UP = 1;
Edge.MOUSE_WHEEL_DOWN = -1;
Edge.MOUSE_WHEEL_NONE = 0;
