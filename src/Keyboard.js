var Game = Game || {};

Game.Keyboard = function(game) {
    var self = this;

    self.ignoredKeys = [Game.KEY_F5]; // Keys to be send to the Browser.
    self.ignoreInput = false;

    game.canvas.tabIndex = 1; // Force canvas to be a "focusable" object.
    game.canvas.style.outline = "none"; // Disable the focus outline.
    game.canvas.addEventListener("keydown", onKeyDown, false);
    game.canvas.addEventListener("keyup", onKeyUp, false);
    game.canvas.addEventListener("keypress", onKeyPress, false);
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

    function onKeyPress(e)
    {
        if (!self.ignoreInput && self.ignoredKeys.indexOf(e.keyCode) === -1) {
            e.preventDefault();
            game.event("keyboard.keyPress", {keyCode: e.keyCode}, self);
            game.event("keyboard.keyPress" + e.keyCode,
                {keyCode: e.keyCode}, self);
            return false;
        }
        return true;
    }
};

Game.KEY_BACKSPACE = 8;
Game.KEY_TAB = 9;
Game.KEY_ENTER = 13;
Game.KEY_SHIFT = 16;
Game.KEY_CTRL = 17;
Game.KEY_ALT = 18;
Game.KEY_PAUSE = 19;
Game.KEY_CAPS_LOCK = 20;
Game.KEY_ESCAPE = 27;
Game.KEY_PAGE_UP = 33;
Game.KEY_PAGE_DOWN = 34;
Game.KEY_END = 35;
Game.KEY_HOME = 36;
Game.KEY_LEFT = 37
Game.KEY_UP = 38;
Game.KEY_RIGHT = 39;
Game.KEY_DOWN = 40;
Game.KEY_INSERT = 45;
Game.KEY_DELETE = 46;
Game.KEY_0 = 48;
Game.KEY_1 = 49;
Game.KEY_2 = 50;
Game.KEY_3 = 51;
Game.KEY_4 = 52;
Game.KEY_5 = 53;
Game.KEY_6 = 54;
Game.KEY_7 = 55;
Game.KEY_8 = 56;
Game.KEY_9 = 57;
Game.KEY_A = 65;
Game.KEY_B = 66;
Game.KEY_C = 67;
Game.KEY_D = 68;
Game.KEY_E = 69;
Game.KEY_F = 70;
Game.KEY_G = 71;
Game.KEY_H = 72;
Game.KEY_I = 73;
Game.KEY_J = 74;
Game.KEY_K = 75;
Game.KEY_L = 76;
Game.KEY_M = 77;
Game.KEY_N = 78;
Game.KEY_O = 79;
Game.KEY_P = 80;
Game.KEY_Q = 81;
Game.KEY_R = 82;
Game.KEY_S = 83;
Game.KEY_T = 84;
Game.KEY_U = 85;
Game.KEY_V = 86;
Game.KEY_W = 87;
Game.KEY_X = 88;
Game.KEY_Y = 89;
Game.KEY_Z = 90;
Game.KEY_LEFT_WINDOW = 91;
Game.KEY_RIGHT_WINDOW = 92;
Game.KEY_SELECT = 93;
Game.KEY_NUMPAD_0 = 96;
Game.KEY_NUMPAD_1 = 97;
Game.KEY_NUMPAD_2 = 98;
Game.KEY_NUMPAD_3 = 99;
Game.KEY_NUMPAD_4 = 100;
Game.KEY_NUMPAD_5 = 101;
Game.KEY_NUMPAD_6 = 102;
Game.KEY_NUMPAD_7 = 103;
Game.KEY_NUMPAD_8 = 104;
Game.KEY_NUMPAD_9 = 105;
Game.KEY_MULTIPLY = 106;
Game.KEY_ADD = 107;
Game.KEY_SUBTRACT = 109;
Game.KEY_DECIMAL_POINT = 110;
Game.KEY_DIVIDE = 111;
Game.KEY_F1 = 112;
Game.KEY_F2 = 113;
Game.KEY_F3 = 114;
Game.KEY_F4 = 115;
Game.KEY_F5 = 116;
Game.KEY_F6 = 117;
Game.KEY_F7 = 118;
Game.KEY_F8 = 119;
Game.KEY_F9 = 120;
Game.KEY_F10 = 121;
Game.KEY_F11 = 122;
Game.KEY_F12 = 123;
Game.KEY_NUM_LOCK = 144;
Game.KEY_SCROLL_LOCK = 145;
Game.KEY_SEMI_COLON = 186;
Game.KEY_EQUAL_SIGN = 187;
Game.KEY_COMMA = 188;
Game.KEY_DASH = 189;
Game.KEY_PERIOD = 190;
Game.KEY_FORWARD_SLASH = 191;
Game.KEY_GRAVE_ACCENT = 192;
Game.KEY_OPEN_BRACKET = 219;
Game.KEY_BACK_SLASH = 220;
Game.KEY_CLOSE_BRACKET = 221;
Game.KEY_SINGLE_QUOTE = 222;
