function Engine(canvasElement)
{
    const TICK_INTERVAL = 1000 / 15;
    const REFRESH_INTERVAL = 1000 / 60;
    
    this.canvas = canvasElement;
    var tickTimer = setInterval(tick, TICK_INTERVAL);
    var refreshTimer = setInterval(refresh, REFRESH_INTERVAL);
    var stages = {};
    var currentStage = null;
    var context = canvasElement.getContext("2d");
    var mouse = new MouseManager(this);
    this.keyboard = new KeyboardManager(this);

    this.createStage = function(name) {
        stages[name] = new Stage();
        return stages[name];
    };
    
    this.enterStage = function(name) {
        this.exitStage(); // Exit the current stage if any
        stages[name].sprites.onEnterStage(name, function() {
            currentStage = stages[name];
            currentStage.onEnter();
        });
    };
    
    this.exitStage = function() {
        if (currentStage) {
            currentStage.onExit();
        }
        currentStage = null;
    };
    
    function refresh()
    {
        if (currentStage) {
            currentStage.onRefresh();
        }
    }
    
    function tick()
    {
        if (currentStage) {
            currentStage.onTick();
        }
    }
}

function Stage()
{
    var images = {};
    var keyBindings = [];

    this.sprites = new SpritesManager(images);

    this.addImage = function(name, src) {
        images[name] = src;
    };
    
    this.removeImage = function(name) {
        delete image[name];
    };
    
    this.setKeyBinding = function(keyCode, fn) {
        keyBindings[keyCode] = fn;
    };
    
    this.unsetKeyBinding = function(keyCode) {
        keyBindings[keyCode] = null;
    };
    
    this.onEnter = function() {};
    this.onTick = function() {};
    this.onRefresh = function() {};
    this.onExit = function() {};
    this.onMouseWheelUp = function() {};
    this.onMouseWheelDown = function() {};
    this.onMouseLeft = function() {};
    this.onMouseCenter = function() {};
    this.onMouseRight = function() {};
    this.onMouseDrag = function() {};
    this.onMouseDown = function() {};
}

function MouseManager(engine)
{
    this.NONE = -1;
    this.LEFT = 0;
    this.CENTER = 1;
    this.RIGHT = 2;
    this.WHEEL_UP = 1;
    this.WHEEL_DOWN = -1;
    this.WHEEL_NONE = 0;
    this.event = null;
    
    var isMouseDown = false;
    var mouseButtonPressed = this.MOUSE_NONE;
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
        this.event = new MouseEvent(e);
        if (engine.currentStage) {
            if (this.event.wheelDirection == this.WHEEL_UP) {
                engine.currentStage.onMouseWheelUp();
            } else if (this.event.wheelDirection == this.WHEEL_DOWN) {
                engine.currentStage.onMouseWheelDown();
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
            this.event = new MouseEvent(e);
            this.event.x -= originX;
            this.event.y -= originY;
            this.event.button = mouseButtonPressed;
            if (engine.currentStage) {
                switch (mouseButtonPressed) {
                    case this.LEFT:
                        engine.currentStage.onMouseLeft();
                        break;
                    case this.CENTER:
                        engine.currentStage.onMouseCenter();
                        break;
                    case this.RIGHT:
                        engine.currentStage.onMouseRight();
                        break;
                }
            }
        }
        mouseMoved = false;
        isMouseDown = false;
        mouseButtonPressed = this.NONE;
        return false;
    }

    function onMouseOut(e)
    {
        onMouseUp(e);
    }
    
    function onMouseMove(e)
    {
        this.event = new MouseEvent(e);
        mouseMoved = true;
        if (mouseDown) {
            originX = this.event.x - mouseOldX;
            originY = this.event.y - mouseOldY;
            this.event.originX = originX;
            this.event.originY = originY;
            this.event.button = mouseButtonPressed;
            if (originX > 0) {
                originX = 0;
            }
            if (originY > 0) {
                originY = 0;
            }
            if (engine.currentStage) {
                engine.currentStage.onMouseDrag();
            }
        } else {
            if (engine.currentStage) {
                engine.currentStage.onMouseMove();
            }
        }
        return false;
    }
}

function MouseEvent(e)
{
    this.rawEvent = e;
    this.wheelDirection = e.wheelDelta / 120;
    this.button = e.button;
    this.x = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
    this.y = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;
    this.originX = 0;
    this.originY = 0;
}

function SpritesManager(images)
{
    var sprites = {};
    var loaded = false;
    
    this.onEnterStage = function(callback) {
        if (!loaded) {
            var imagesLoaded = 0;
            for (var name in images) {
                if (images.hasOwnProperty(name)) {
                    var img = new Image();
                    sprites[name] = img;
                    img.onload = function(e) {
                        if (++imagesLoaded == images.length) {
                            loaded = true;
                            callback();
                        }
                    };
                    img.src = images[name];
                }
            }
        }
    };
}




function KeyboardManager(engine)
{
    this.KEY_BACKSPACE = 8;
    this.KEY_TAB = 9;
    this.KEY_ENTER = 13;
    this.KEY_SHIFT = 16;
    this.KEY_CTRL = 17;
    this.KEY_ALT = 18;
    this.KEY_PAUSE = 19;
    this.KEY_CAPS_LOCK = 20;
    this.KEY_ESCAPE = 27;
    this.KEY_PAGE_UP = 33;
    this.KEY_PAGE_DOWN = 34;
    this.KEY_END = 35;
    this.KEY_HOME = 36;
    this.KEY_LEFT = 37
    this.KEY_UP = 38;
    this.KEY_RIGHT = 39;
    this.KEY_DOWN = 40;
    this.KEY_INSERT = 45;
    this.KEY_DELETE = 46;
    this.KEY_0 = 48;
    this.KEY_1 = 49;
    this.KEY_2 = 50;
    this.KEY_3 = 51;
    this.KEY_4 = 52;
    this.KEY_5 = 53;
    this.KEY_6 = 54;
    this.KEY_7 = 55;
    this.KEY_8 = 56;
    this.KEY_9 = 57;
    this.KEY_A = 65;
    this.KEY_B = 66;
    this.KEY_C = 67;
    this.KEY_D = 68;    
    this.KEY_E = 69;
    this.KEY_F = 70;
    this.KEY_G = 71;
    this.KEY_H = 72;
    this.KEY_I = 73;
    this.KEY_J = 74;
    this.KEY_K = 75;
    this.KEY_L = 76;
    this.KEY_M = 77;
    this.KEY_N = 78;
    this.KEY_O = 79;
    this.KEY_P = 80;
    this.KEY_Q = 81;
    this.KEY_R = 82;
    this.KEY_S = 83;
    this.KEY_T = 84;
    this.KEY_U = 85;
    this.KEY_V = 86;
    this.KEY_W = 87;
    this.KEY_X = 88;
    this.KEY_Y = 89;
    this.KEY_Z = 90;
    this.KEY_LEFT_WINDOW = 91;
    this.KEY_RIGHT_WINDOW = 92;
    this.KEY_SELECT = 93;
    this.KEY_NUMPAD_0 = 96;
    this.KEY_NUMPAD_1 = 97;
    this.KEY_NUMPAD_2 = 98;
    this.KEY_NUMPAD_3 = 99;
    this.KEY_NUMPAD_4 = 100;
    this.KEY_NUMPAD_5 = 101;
    this.KEY_NUMPAD_6 = 102;
    this.KEY_NUMPAD_7 = 103;    
    this.KEY_NUMPAD_8 = 104;
    this.KEY_NUMPAD_9 = 105;
    this.KEY_MULTIPLY = 106;
    this.KEY_ADD = 107;
    this.KEY_SUBTRACT = 109;
    this.KEY_DECIMAL_POINT = 110;
    this.KEY_DIVIDE = 111;
    this.KEY_F1 = 112;
    this.KEY_F2 = 113;
    this.KEY_F3 = 114;
    this.KEY_F4 = 115;
    this.KEY_F5 = 116;
    this.KEY_F6 = 117;
    this.KEY_F7 = 118;
    this.KEY_F8 = 119;
    this.KEY_F9 = 120;
    this.KEY_F10 = 121;
    this.KEY_F11 = 122;
    this.KEY_F12 = 123;
    this.KEY_NUM_LOCK = 144;
    this.KEY_SCROLL_LOCK = 145;
    this.KEY_SEMI_COLON = 186;
    this.KEY_EQUAL_SIGN = 187;
    this.KEY_COMMA = 188;
    this.KEY_DASH = 189;
    this.KEY_PERIOD = 190;
    this.KEY_FORWARD_SLASH = 191;
    this.KEY_GRAVE_ACCENT = 192;
    this.KEY_OPEN_BRACKET = 219;
    this.KEY_BACK_SLASH = 220;
    this.KEY_CLOSE_BRACKET = 221;
    this.KEY_SINGLE_QUOTE = 222;
    
    engine.canvas.tabindex = 1; // Force canvas to be a "focusable" object.
    engine.canvas.style.outline = "none"; // Disable the focus outline.
    engine.canvas.addEventListener("keydown", onKeyDown, false);
    
    function onKeyDown(e)
    {
        if (engine.currentStage && engine.currentStage.keyBindings[e.keyCode]) {
            e.preventDefault();
            engine.currentStage.keyBindings[e.keyCode](e);
            return false;
        }
    }
}

