/// <reference path="../typings/node_modules/@types/jquery/index.d.ts" />
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
        get gameState() {
            return this._gameState;
        }
        set gameState(pNewGamestate) {
            if (pNewGamestate === GameState.Start) {
                $(".menuInfo").show();
                $(".rankingTable, .rankingInfo").hide();
            }
            else if (pNewGamestate === GameState.Running) {
                $(".menuInfo").hide();
                $(".rankingTable, .rankingInfo").hide();
                this.utils.soundBackground.play();
            }
            else if (pNewGamestate === GameState.Finish) {
                $(".rankingTable, .rankingInfo").show();
                this.utils.soundBackground.stop();
                this.utils.soundFinish.play();
            }
            this._gameState = pNewGamestate;
        }
        initListeners() {
            window.addEventListener("resize", event => {
                this.engine.resizeEngine();
            });
            window.addEventListener("keydown", event => {
                if (this.gameState != GameState.Init) {
                    switch (event.key) {
                        case "ArrowLeft":
                        case "a":
                            this.player.switchLeftRightPlayer(-1);
                            this.utils.soundChangeDirection.play();
                            break;
                        case "ArrowRight":
                        case "d":
                            this.player.switchLeftRightPlayer(1);
                            this.utils.soundChangeDirection.play();
                            break;
                        case "ArrowUp":
                        case "w":
                            if (this.gameState === GameState.Running) {
                                console.log("ArrowUp keydown");
                                this.player.speedChanges = 1;
                            }
                            break;
                        case "ArrowDown":
                        case "s":
                            if (this.gameState === GameState.Running) {
                                console.log("car move slower");
                                this.player.speedChanges = -2;
                            }
                            break;
                        case " ":
                            if (this.gameState === GameState.Start) {
                                this.gameState = GameState.Running;
                                this.utils.soundStart.play();
                            }
                            break;
                        case "r":
                            this.player.reset();
                            this.gameState = GameState.Start;
                            break;
                        case "c":
                            if (this.gameState === GameState.Start) {
                                this.level.createLevel();
                            }
                            break;
                    }
                }
            });
            window.addEventListener("keyup", event => {
                if (this.gameState === GameState.Running) {
                    switch (event.key) {
                        case "ArrowUp":
                        case "w":
                            console.log("ArrowUp keyup");
                            this.player.speedChanges = -0.1;
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