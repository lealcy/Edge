function Keyboard()
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
        } else {
            engine.dmsg("KeyEvent not bound: " + e.keycode);
        }            
    }
}