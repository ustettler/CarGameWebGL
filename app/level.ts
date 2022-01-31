namespace RacingGame {
  export class Level {
    manager: Manager;
    dataMap: Array<any>;

    refDollarModel: THREE.Object3D;
    refObstacleModel: THREE.Object3D;

    constructor(pManager: Manager) {
      this.manager = pManager;
    }
  }
}
