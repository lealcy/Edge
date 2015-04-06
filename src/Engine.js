function Engine(canvasElement)
{
	var self = this; 

    const TICK_INTERVAL = 1000 / 15;
    const REFRESH_INTERVAL = 1000 / 60;

	self.debug = false;
    self.canvas = canvasElement;
    var currentStage = null;
    var tickTimer = setInterval(tick, TICK_INTERVAL);
    var refreshTimer = setInterval(refresh, REFRESH_INTERVAL);
    var stages = {};
    var context = canvasElement.getContext("2d");
    var mouse = new MouseManager(self);
    self.keyboard = new KeyboardManager();
	
	self.dmsg = function(msg) {
		if (self.debug) {
			console.log(msg);
		}
	};

    self.createStage = function(name) {
        stages[name] = new Stage(self);
        return stages[name];
    };
    
    self.enterStage = function(name) {
        self.exitStage(); // Exit the current stage if any
		self.keyboard.onEnterStage(self);
        stages[name].sprites.onEnterStage(function() {
            currentStage = stages[name];
            currentStage.onEnter();
        });
    };
    
    self.exitStage = function() {
        if (currentStage) {
            currentStage.onExit();
        }
        currentStage = null;
    };
	
	self.getContext = function() {
		return context;
	};
	
	self.getCurrentStage = function() {
		return currentStage;
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

function Stage(engine)
{
	var self = this;
	
    var images = {};
    self.keyBindings = [];
	self.sprites = new SpritesManager(images);

    self.addImage = function(name, src) {
        images[name] = src;
    };
    
    self.removeImage = function(name) {
        delete image[name];
    };
    
    self.setKeyBinding = function(keyCode, fn) {
        self.keyBindings[keyCode] = fn;
    };
    
    self.unsetKeyBinding = function(keyCode) {
        self.keyBindings[keyCode] = null;
    };
    
    self.onEnter = function() { engine.dmsg("Stage onEnter event not defined."); };
    self.onTick = function() { };
    self.onRefresh = function() { };
    self.onExit = function() { engine.dmsg("Stage onExit event not defined."); };
    self.onMouseWheelUp = function() { engine.dmsg("Stage onMouseWheelUp event not defined."); };
    self.onMouseWheelDown = function() { engine.dmsg("Stage onMouseWhellDown event not defined."); };
    self.onMouseLeft = function() { engine.dmsg("Stage onMouseLeft event not defined."); };
    self.onMouseCenter = function() { engine.dmsg("Stage onMouseCenter event not defined."); };
    self.onMouseRight = function() { engine.dmsg("Stage onMouseRight event not defined."); };
    self.onMouseDrag = function() { engine.dmsg("Stage onMouseDrag event not defined."); };
    self.onMouseDown = function() { engine.dmsg("Stage onMouseDown event not defined."); };
	self.onMouseMove = function() { engine.dmsg("Stage onMouseMove event not defined."); };
}

function MouseManager(engine)
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

function SpritesManager(images)
{
	var self = this;
	
    var sprites = {};
    var loaded = false;
    
    self.onEnterStage = function(callback) {
		if (!images.length) {
			loaded = true;
			callback();
		} else if (!loaded) {
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

function KeyboardManager()
{
	var self = this;
	var started = false;
	var engine = null;
	
    self.KEY_BACKSPACE = 8;
    self.KEY_TAB = 9;
    self.KEY_ENTER = 13;
    self.KEY_SHIFT = 16;
    self.KEY_CTRL = 17;
    self.KEY_ALT = 18;
    self.KEY_PAUSE = 19;
    self.KEY_CAPS_LOCK = 20;
    self.KEY_ESCAPE = 27;
    self.KEY_PAGE_UP = 33;
    self.KEY_PAGE_DOWN = 34;
    self.KEY_END = 35;
    self.KEY_HOME = 36;
    self.KEY_LEFT = 37
    self.KEY_UP = 38;
    self.KEY_RIGHT = 39;
    self.KEY_DOWN = 40;
    self.KEY_INSERT = 45;
    self.KEY_DELETE = 46;
    self.KEY_0 = 48;
    self.KEY_1 = 49;
    self.KEY_2 = 50;
    self.KEY_3 = 51;
    self.KEY_4 = 52;
    self.KEY_5 = 53;
    self.KEY_6 = 54;
    self.KEY_7 = 55;
    self.KEY_8 = 56;
    self.KEY_9 = 57;
    self.KEY_A = 65;
    self.KEY_B = 66;
    self.KEY_C = 67;
    self.KEY_D = 68;    
    self.KEY_E = 69;
    self.KEY_F = 70;
    self.KEY_G = 71;
    self.KEY_H = 72;
    self.KEY_I = 73;
    self.KEY_J = 74;
    self.KEY_K = 75;
    self.KEY_L = 76;
    self.KEY_M = 77;
    self.KEY_N = 78;
    self.KEY_O = 79;
    self.KEY_P = 80;
    self.KEY_Q = 81;
    self.KEY_R = 82;
    self.KEY_S = 83;
    self.KEY_T = 84;
    self.KEY_U = 85;
    self.KEY_V = 86;
    self.KEY_W = 87;
    self.KEY_X = 88;
    self.KEY_Y = 89;
    self.KEY_Z = 90;
    self.KEY_LEFT_WINDOW = 91;
    self.KEY_RIGHT_WINDOW = 92;
    self.KEY_SELECT = 93;
    self.KEY_NUMPAD_0 = 96;
    self.KEY_NUMPAD_1 = 97;
    self.KEY_NUMPAD_2 = 98;
    self.KEY_NUMPAD_3 = 99;
    self.KEY_NUMPAD_4 = 100;
    self.KEY_NUMPAD_5 = 101;
    self.KEY_NUMPAD_6 = 102;
    self.KEY_NUMPAD_7 = 103;    
    self.KEY_NUMPAD_8 = 104;
    self.KEY_NUMPAD_9 = 105;
    self.KEY_MULTIPLY = 106;
    self.KEY_ADD = 107;
    self.KEY_SUBTRACT = 109;
    self.KEY_DECIMAL_POINT = 110;
    self.KEY_DIVIDE = 111;
    self.KEY_F1 = 112;
    self.KEY_F2 = 113;
    self.KEY_F3 = 114;
    self.KEY_F4 = 115;
    self.KEY_F5 = 116;
    self.KEY_F6 = 117;
    self.KEY_F7 = 118;
    self.KEY_F8 = 119;
    self.KEY_F9 = 120;
    self.KEY_F10 = 121;
    self.KEY_F11 = 122;
    self.KEY_F12 = 123;
    self.KEY_NUM_LOCK = 144;
    self.KEY_SCROLL_LOCK = 145;
    self.KEY_SEMI_COLON = 186;
    self.KEY_EQUAL_SIGN = 187;
    self.KEY_COMMA = 188;
    self.KEY_DASH = 189;
    self.KEY_PERIOD = 190;
    self.KEY_FORWARD_SLASH = 191;
    self.KEY_GRAVE_ACCENT = 192;
    self.KEY_OPEN_BRACKET = 219;
    self.KEY_BACK_SLASH = 220;
    self.KEY_CLOSE_BRACKET = 221;
    self.KEY_SINGLE_QUOTE = 222;
    
	self.onEnterStage = function(e) {
		if (!started) {
			started = true;
			engine = e;
			engine.canvas.tabIndex = 1; // Force canvas to be a "focusable" object.
			engine.canvas.style.outline = "none"; // Disable the focus outline.
			engine.canvas.addEventListener("keydown", onKeyDown, false);
			engine.canvas.focus();

		}
	};
	
    function onKeyDown(e)
    {
        if (engine.getCurrentStage() && engine.getCurrentStage().keyBindings[e.keyCode]) {
            e.preventDefault();
            engine.getCurrentStage().keyBindings[e.keyCode](e);
            return false;
        }			
    }
}

