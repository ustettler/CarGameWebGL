/// <reference path="../typings/node_modules/@types/jquery/index.d.ts" />

namespace RacingGame {
  export class Player {
    manager: Manager;
    score: number;
    speed: number;
    speedChanges: number;
    refPlayerModel: THREE.Object3D;

    constructor(pManager: Manager) {
      this.manager = pManager;
    }

    reset() {
      this.speed = 0;
      this.speedChanges = 0;
      this.score = 0;

      if (this.refPlayerModel !== undefined) {
        this.refPlayerModel.position.x = 0;
        this.refPlayerModel.position.z = 0;
      }

      for (let i = 0; i < this.manager.level.dataMap.length; i++) {
        this.manager.level.dataMap[i].visible = true;
      }
    }

    switchLeftRightPlayer(pSwitchValue: number) {
      if (pSwitchValue < 0 && this.refPlayerModel.position.x >= 0) {
        this.refPlayerModel.position.x -= 5.5;
      }
      else if (pSwitchValue > 0 && this.refPlayerModel.position.x <= 0) {
        this.refPlayerModel.position.x += 5.5;
      }
    }

    move() {
      if (this.speedChanges !== 0) {
        this.speed += this.speedChanges;
        if (this.speed <= 0) {
          this.speed = 0;
          this.speedChanges = 0;
        }
      }
      this.refPlayerModel.position.z -= (this.speed * 0.01);
      this.manager.engine.cameraGroup.position.z = this.refPlayerModel.position.z;

      $("#speedData").html(""+Math.floor(this.speed));
      $("#scoreData").html(""+Math.floor(this.score));

      if (this.refPlayerModel.position.z < -1110 && this.manager.gameState === GameState.Running) {
        this.manager.gameState = GameState.Finish;
        this.speedChanges = -12;
      }

      //Collision Detection
      for (let i = 0; i < this.manager.level.dataMap.length; i++) {
        let tempObj = this.manager.level.dataMap[i];
        //if-Verzweigung
        //tempObj.position.x / .z / .visible
        //this.refPlayerModel.position.z / .x
        if (tempObj.position.x === this.refPlayerModel.position.x &&
            tempObj.position.z > this.refPlayerModel.position.z &&
            tempObj.position.z < (this.refPlayerModel.position.z + 10) &&
            tempObj.visible) {
              tempObj.visible = false;
              if (tempObj.name === "Collectible") {
                //DollarModel
                this.score += this.speed;
                this.manager.utils.soundCollect.play();
              }
              else {
                //ObstacleModel
                this.speed /= 2;
                this.manager.utils.soundError.play();
              }
        }
      }
    }
  }
}