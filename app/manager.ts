/// <reference path="../typings/node_modules/@types/jquery/index.d.ts" />

namespace RacingGame {
  export class Manager {
    engine: Engine;
    player: Player;
    level: Level;
    utils: Utils;

    private _gameState: GameState;

    constructor() {
      this.gameState = GameState.Init;
      this.engine = new Engine(this);
      this.player = new Player(this);
      this.level = new Level(this);
      this.utils = new Utils();
      this.initListeners();
      console.log("Manager init successful");
    }

    get gameState(): GameState {
      return this._gameState;
    }
    set gameState(pNewGamestate: GameState) {
      if (pNewGamestate === GameState.Start) {
        $(".menuInfo").show();
        $(".rankingTable, .rankingInfo").hide();
      }
      else if (pNewGamestate === GameState.Running) {
        $(".menuInfo").hide();
        $(".rankingTable, .rankingInfo").hide();
      }
      else if (pNewGamestate === GameState.Finish) {
        $(".rankingTable, .rankingInfo").show();
      }
      this._gameState = pNewGamestate;
    }

    private initListeners() {
      window.addEventListener("resize", event => {
        console.log("resize-event")
      });
      window.addEventListener("keydown", event => {
        if (this.gameState != GameState.Init) {
          switch(event.key) {
            case "ArrowLeft":
            case "a":
              this.player.switchLeftRightPlayer(-1);
              console.log("car move left");
              break;
            case "ArrowRight":
            case "d":
              this.player.switchLeftRightPlayer(1);
              console.log("car move right");
              break;
            case "ArrowUp":
            case "w":
                console.log("ArrowUp keydown");
                this.player.speedChanges = 1;
                break;
            case "ArrowDown":
            case "s":
              console.log("car move slower");
              this.player.speedChanges = -2;
              break;
            case " ":
              this.gameState = GameState.Running;
              break;
            case "r":
              console.log("r");
              this.player.reset();
              break;
          }
        }
      });

      window.addEventListener("keyup", event => {
        if (this.gameState != GameState.Init) {
          switch(event.key) {
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

  export enum GameState {
    Init = -1,
    Start = 0,
    Running = 1,
    Finish = 2
  }
}