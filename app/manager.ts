namespace RacingGame {
  export class Manager {
    engine: Engine;
    player: Player;
    level: Level;
    utils: Utils;

    gameState: GameState;

    constructor() {
      this.gameState = GameState.Init;
      this.engine = new Engine(this);
      this.player = new Player(this);
      this.level = new Level(this);
      this.utils = new Utils();
      this.initListeners();
      console.log("Manager init successful");
    }

    private initListeners() {
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

  export enum GameState {
    Init = -1,
    Start = 0,
    Running = 1,
    Finish = 2,
  }
}
