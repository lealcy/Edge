function Game(canvasElement)
{
    var self = this; 

    const TICK_INTERVAL = 1000 / 15;
    const REFRESH_INTERVAL = 1000 / 60;

    self.canvas = canvasElement;
    self.context = canvasElement.getContext("2d"); // temporary
    self.currentStage = null;
    var tickTimer = setInterval(tick, TICK_INTERVAL);
    var refreshTimer = setInterval(refresh, REFRESH_INTERVAL);
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
        stage.enter();
    };
    
    self.exitStage = function() {
        if (self.currentStage) {
            self.currentStage.exit();
        }
        self.currentStage = null;
    };

    function refresh()
    {
        if (self.currentStage) {
            self.currentStage.onRefresh();
        }
    }
    
    function tick()
    {
        if (self.currentStage) {
            self.currentStage.onTick();
        }
    }
}


