var RacingGame;
(function (RacingGame) {
    class Manager {
        constructor() {
            this.gameState = GameState.Init;
            this.engine = new RacingGame.Engine(this);
            this.player = new RacingGame.Player(this);
            this.level = new RacingGame.Level(this);
            this.utils = new RacingGame.Utils();
            this.initListeners();
            console.log("Manager init successful");
        }
        initListeners() {
            window.addEventListener("resize", (event) => {
                console.log("resize-event");
            });
            window.addEventListener("keydown", (event) => {
                if (this.gameState != GameState.Init) {
                    switch (event.key) {
                        case "ArrowLeft":
                        case "a":
                            console.log("car move left");
                            break;
                        case "ArrowRight":
                        case "d":
                            console.log("car move right");
                            break;
                        case "ArrowUp":
                        case "w":
                            console.log("car move faster");
                            break;
                        case "ArrowDown":
                        case "s":
                            console.log("car move slower");
                            break;
                    }
                }
            });
        }
    }
    RacingGame.Manager = Manager;
    let GameState;
    (function (GameState) {
        GameState[GameState["Init"] = -1] = "Init";
        GameState[GameState["Start"] = 0] = "Start";
        GameState[GameState["Running"] = 1] = "Running";
        GameState[GameState["Finish"] = 2] = "Finish";
    })(GameState = RacingGame.GameState || (RacingGame.GameState = {}));
})(RacingGame || (RacingGame = {}));
//# sourceMappingURL=manager.js.map