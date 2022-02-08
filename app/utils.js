/// <reference path="../typings/node_modules/@types/howler/howler.d.ts" />
var RacingGame;
(function (RacingGame) {
    class Utils {
        constructor() {
            this.soundBackground = new Howl({
                src: ["media/audio/musicfox_demo_MF-4131.mp3"]
            });
            this.soundStart = new Howl({
                src: ["media/audio/Epic_Bag_Open.mp3"]
            });
            this.soundChangeDirection = new Howl({
                src: ["media/audio/Cool_UI_Button.mp3"]
            });
            this.soundFinish = new Howl({
                src: ["media/audio/Congrats_4.mp3"]
            });
            this.soundCollect = new Howl({
                src: ["media/audio/5_Wickets.mp3"]
            });
            this.soundError = new Howl({
                src: ["media/audio/Health_Alert_3.mp3"]
            });
        }
    }
    RacingGame.Utils = Utils;
})(RacingGame || (RacingGame = {}));
//# sourceMappingURL=utils.js.map