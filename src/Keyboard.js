var Edge = Edge || {};

Edge.Keyboard = function(game) {
    var self = this;

    // Keys to be send to the Browser.
    self.ignoredKeys = [Edge.KEY_F5, Edge.KEY_F12];

    // Disable keyboard events altogether.
    self.ignoreInput = false;

    game.canvas.tabIndex = 1; // Force canvas to be a "focusable" object.
    game.canvas.style.outline = "none"; // Disable the focus outline.
    game.canvas.addEventListener("keydown", onKeyDown, false);
    game.canvas.addEventListener("keyup", onKeyUp, false);
    game.canvas.focus();

    function onKeyDown(e)
    {
        if (!self.ignoreInput && self.ignoredKeys.indexOf(e.keyCode) === -1) {
            e.preventDefault();
            game.event("keyboard.keyDown", {keyCode: e.keyCode}, self);
            game.event("keyboard.keyDown" + e.keyCode,
                {keyCode: e.keyCode}, self);
            return false;
        }
        return true;
    }

    function onKeyUp(e)
    {
        if (!self.ignoreInput && self.ignoredKeys.indexOf(e.keyCode) === -1) {
            e.preventDefault();
            game.event("keyboard.keyUp", {keyCode: e.keyCode}, self);
            game.event("keyboard.keyUp" + e.keyCode,
                {keyCode: e.keyCode}, self);
            return false;
        }
    }
};

Edge.KEY_BACKSPACE = 8;
Edge.KEY_TAB = 9;
Edge.KEY_ENTER = 13;
Edge.KEY_SHIFT = 16;
Edge.KEY_CTRL = 17;
Edge.KEY_ALT = 18;
Edge.KEY_PAUSE = 19;
Edge.KEY_CAPS_LOCK = 20;
Edge.KEY_ESCAPE = 27;
Edge.KEY_PAGE_UP = 33;
Edge.KEY_PAGE_DOWN = 34;
Edge.KEY_END = 35;
Edge.KEY_HOME = 36;
Edge.KEY_LEFT = 37
Edge.KEY_UP = 38;
Edge.KEY_RIGHT = 39;
Edge.KEY_DOWN = 40;
Edge.KEY_INSERT = 45;
Edge.KEY_DELETE = 46;
Edge.KEY_0 = 48;
Edge.KEY_1 = 49;
Edge.KEY_2 = 50;
Edge.KEY_3 = 51;
Edge.KEY_4 = 52;
Edge.KEY_5 = 53;
Edge.KEY_6 = 54;
Edge.KEY_7 = 55;
Edge.KEY_8 = 56;
Edge.KEY_9 = 57;
Edge.KEY_A = 65;
Edge.KEY_B = 66;
Edge.KEY_C = 67;
Edge.KEY_D = 68;
Edge.KEY_E = 69;
Edge.KEY_F = 70;
Edge.KEY_G = 71;
Edge.KEY_H = 72;
Edge.KEY_I = 73;
Edge.KEY_J = 74;
Edge.KEY_K = 75;
Edge.KEY_L = 76;
Edge.KEY_M = 77;
Edge.KEY_N = 78;
Edge.KEY_O = 79;
Edge.KEY_P = 80;
Edge.KEY_Q = 81;
Edge.KEY_R = 82;
Edge.KEY_S = 83;
Edge.KEY_T = 84;
Edge.KEY_U = 85;
Edge.KEY_V = 86;
Edge.KEY_W = 87;
Edge.KEY_X = 88;
Edge.KEY_Y = 89;
Edge.KEY_Z = 90;
Edge.KEY_LEFT_WINDOW = 91;
Edge.KEY_RIGHT_WINDOW = 92;
Edge.KEY_SELECT = 93;
Edge.KEY_NUMPAD_0 = 96;
Edge.KEY_NUMPAD_1 = 97;
Edge.KEY_NUMPAD_2 = 98;
Edge.KEY_NUMPAD_3 = 99;
Edge.KEY_NUMPAD_4 = 100;
Edge.KEY_NUMPAD_5 = 101;
Edge.KEY_NUMPAD_6 = 102;
Edge.KEY_NUMPAD_7 = 103;
Edge.KEY_NUMPAD_8 = 104;
Edge.KEY_NUMPAD_9 = 105;
Edge.KEY_MULTIPLY = 106;
Edge.KEY_ADD = 107;
Edge.KEY_SUBTRACT = 109;
Edge.KEY_DECIMAL_POINT = 110;
Edge.KEY_DIVIDE = 111;
Edge.KEY_F1 = 112;
Edge.KEY_F2 = 113;
Edge.KEY_F3 = 114;
Edge.KEY_F4 = 115;
Edge.KEY_F5 = 116;
Edge.KEY_F6 = 117;
Edge.KEY_F7 = 118;
Edge.KEY_F8 = 119;
Edge.KEY_F9 = 120;
Edge.KEY_F10 = 121;
Edge.KEY_F11 = 122;
Edge.KEY_F12 = 123;
Edge.KEY_NUM_LOCK = 144;
Edge.KEY_SCROLL_LOCK = 145;
Edge.KEY_SEMI_COLON = 186;
Edge.KEY_EQUAL_SIGN = 187;
Edge.KEY_COMMA = 188;
Edge.KEY_DASH = 189;
Edge.KEY_PERIOD = 190;
Edge.KEY_FORWARD_SLASH = 191;
Edge.KEY_GRAVE_ACCENT = 192;
Edge.KEY_OPEN_BRACKET = 219;
Edge.KEY_BACK_SLASH = 220;
Edge.KEY_CLOSE_BRACKET = 221;
Edge.KEY_SINGLE_QUOTE = 222;
