var RacingGame;
(function (RacingGame) {
    class Engine {
        constructor(pManager) {
            this.render = () => {
                if (this.renderClock.running) {
                    requestAnimationFrame(this.render);
                }
                this.manager.player.move();
                this.renderer.render(this.scene, this.camera);
                //this.cameraGroup.position.z -= 0.05;
            };
            this.manager = pManager;
            this.init3DScene();
        }
        init3DScene() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2500);
            this.cameraGroup = new THREE.Group();
            this.camera.position.set(0, 8, 18);
            this.camera.lookAt(0, 0, 0);
            let lightD = new THREE.DirectionalLight(0xffffff, 3);
            lightD.position.set(0, 10, 5);
            this.scene.add(lightD);
            this.scene.add(this.cameraGroup);
            this.cameraGroup.add(this.camera);
            let skyboxloader = new THREE.CubeTextureLoader();
            this.scene.background = skyboxloader.load([
                "media/skybox/TropicalSunnyDay_px.jpg",
                "media/skybox/TropicalSunnyDay_nx.jpg",
                "media/skybox/TropicalSunnyDay_py.jpg",
                "media/skybox/TropicalSunnyDay_ny.jpg",
                "media/skybox/TropicalSunnyDay_pz.jpg",
                "media/skybox/TropicalSunnyDay_nz.jpg"
            ]);
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.resizeEngine();
            document.body.appendChild(this.renderer.domElement);
            let myloader = new THREE.ObjectLoader();
            myloader.load("media/models/models_combined.json", (object) => {
                this.scene.add(object);
                this.manager.player.refPlayerModel = this.scene.getObjectByName("car");
                //set material properties
                let mainMaterial1 = this.scene.getObjectByName("Path").material;
                mainMaterial1.map.wrapS = THREE.RepeatWrapping;
                mainMaterial1.map.wrapT = THREE.RepeatWrapping;
                mainMaterial1.map.repeat.set(1, 1);
                this.renderClock = new THREE.Clock();
                this.manager.gameState = RacingGame.GameState.Start;
                this.startRenderLoop();
                console.log("on start rendering");
            }, (data) => {
                console.log("on progress");
            }, (data) => {
                console.log("on error");
            });
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
        stopRenderLoop() {
        }
    }
    RacingGame.Engine = Engine;
})(RacingGame || (RacingGame = {}));
//# sourceMappingURL=engine.js.map