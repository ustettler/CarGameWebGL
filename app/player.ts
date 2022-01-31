namespace RacingGame {
  export class Player {
    manager: Manager;
    score: number;
    speed: number;
    lane: number;
    refPlayerModel: THREE.Object3D;

    constructor(pManager: Manager) {
      this.manager = pManager;
    }
  }
}
