Dnt.SceneManager = function(stage) {
    this.stage = stage;
    this.activeScene = null;
}

Dnt.SceneManager.prototype.constructor = Dnt.SceneManager;


Dnt.SceneManager.prototype.setActiveScene = function(scene) {
    if (this.activeScene) {
        this.stage.removeChild(this.activeScene.getSceneContents());
    }

    this.stage.addChild(scene.getSceneContents());

    this.activeScene = scene;
};

Dnt.SceneManager.prototype.update = function() {
    if (this.activeScene) {
        this.activeScene.update();
    }
};
