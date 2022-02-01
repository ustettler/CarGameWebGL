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
      this.reset();
    }

    reset() {
      this.speed = 0;
      this.speedChanges = 0;

      if (this.refPlayerModel !== undefined) {
        this.refPlayerModel.position.x = 0;
        this.refPlayerModel.position.z = 0;
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
    }
  }
}