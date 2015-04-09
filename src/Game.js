var Game = Game || {};

Game.Game = function(canvasElement) {
    var self = this;

    const TICK_INTERVAL = 1000 / 15;
    const REFRESH_INTERVAL = 1000 / 60;

    var running = false;
    
    self.canvas = canvasElement;
    self.context = canvasElement.getContext("2d"); // temporary
    self.currentStage = null;
    /*if (typeof Mouse !== "undefined") {
        self.mouse = new Mouse(); // temporary
    }
    if (typeof Keyboard !== "undefined") { 
        self.keyboard = new Keyboard(); // temporary
    }*/
    
    self.enterStage = function(stage) {
        self.exitStage(); // Exit the current stage if any
        // self.keyboard.onEnterStage(self); // temporary
        self.currentStage = stage;
        running = true;
        setTimeout(tick, TICK_INTERVAL);
        setTimeout(refresh, REFRESH_INTERVAL);
        stage.enter();
    };
    
    self.exitStage = function() {
        running = false;
        if (self.currentStage) {
            self.currentStage.exit();
        }
        self.currentStage = null;
    };

    function refresh()
    {
        if (self.currentStage) {
            self.currentStage.refresh();
        }
        if (running) {
            setTimeout(refresh, REFRESH_INTERVAL);
        }
    }
    
    function tick()
    {
        if (self.currentStage) {
            self.currentStage.tick();
        }
        if (running) {
            setTimeout(tick, TICK_INTERVAL);
        }
    }
};


