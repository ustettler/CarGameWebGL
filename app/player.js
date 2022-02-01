/// <reference path="../typings/node_modules/@types/jquery/index.d.ts" />
var RacingGame;
(function (RacingGame) {
    class Player {
        constructor(pManager) {
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
        switchLeftRightPlayer(pSwitchValue) {
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
            $("#speedData").html("" + Math.floor(this.speed));
        }
    }
    RacingGame.Player = Player;
})(RacingGame || (RacingGame = {}));
//# sourceMappingURL=player.js.map