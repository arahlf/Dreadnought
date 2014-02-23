Dnt.define('Dnt.SceneManager', {

    constructor: function(stage) {
        this.stage = stage;
        this.activeScene = null;
    },

    setActiveScene: function(scene) {
        if (this.activeScene) {
            this.stage.removeChild(this.activeScene.getSceneContents());
        }

        this.stage.addChild(scene.getSceneContents());

        this.activeScene = scene;
    },

    update: function() {
        if (this.activeScene) {
            this.activeScene.update();
        }
    }
});
