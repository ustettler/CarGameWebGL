namespace RacingGame {
  export class Engine {
    manager: Manager;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cameraGroup: THREE.Group;
    renderer: THREE.WebGLRenderer;
    renderClock: THREE.Clock;

    constructor(pManager: Manager) {
      this.manager = pManager;
      this.init3DScene();
    }

    private init3DScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        2500
      );
      this.cameraGroup = new THREE.Group();
      this.camera.position.set(0, 8, 18);
      this.camera.lookAt(0, 0, 0);

      let lightD = new THREE.DirectionalLight(0xffffff, 3);
      lightD.position.set(0, 10, 5);

      this.scene.add(lightD);
      this.scene.add(this.cameraGroup);
      this.cameraGroup.add(this.camera);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.resizeEngine();
      document.body.appendChild(this.renderer.domElement);

      let myloader = new THREE.ObjectLoader();
      myloader.load(
        "media/models/models_combined.json",
        (object: any) => {
          this.scene.add(object);
          this.renderClock = new THREE.Clock();
          this.manager.gameState = GameState.Start;
          this.startRenderLoop();
          console.log("on start rendering");
        },
        (data: any) => {
          console.log("on progress");
        },
        (data: any) => {
          console.log("on error");
        }
      );
    }

    resizeEngine() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startRenderLoop() {
      this.renderClock.start();
      this.render();
    }

    stopRenderLoop() {}

    render = () => {
      if (this.renderClock.running) {
        requestAnimationFrame(this.render);
      }
      this.renderer.render(this.scene, this.camera);
    };
  }
}
