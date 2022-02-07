var RacingGame;
(function (RacingGame) {
    class Level {
        constructor(pManager) {
            this.manager = pManager;
            this.dataMap = [];
        }
        createLevel() {
            for (let i = 0; i < this.dataMap.length; i++) {
                this.manager.engine.scene.remove(this.dataMap[i]);
            }
            this.dataMap = [];
            this.refDollarModel.visible = true;
            this.refObstacleModel.visible = true;
            let selectionXValues = [-5.5, 0, 5.5];
            for (let zValue = -10; zValue > -1100; zValue -= 15) {
                let cloneObject = null;
                if (Math.random() >= 0.5) {
                    cloneObject = this.refObstacleModel.clone();
                }
                else {
                    cloneObject = this.refDollarModel.clone();
                }
                cloneObject.position.set(selectionXValues[Math.floor(Math.random() * 3)], 0, zValue);
                this.manager.engine.scene.add(cloneObject);
                this.dataMap.push(cloneObject);
            }
            this.refDollarModel.visible = false;
            this.refObstacleModel.visible = false;
        }
    }
    RacingGame.Level = Level;
})(RacingGame || (RacingGame = {}));
//# sourceMappingURL=level.js.map