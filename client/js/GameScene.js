Dnt.GameScene = function(sceneManager) {
    Dnt.Scene.call(this);

    this.container = new PIXI.DisplayObjectContainer();
};

Dnt.GameScene.prototype = Object.create(Dnt.Scene.prototype);
Dnt.GameScene.prototype.constructor = Dnt.GameScene;

Dnt.GameScene.prototype.getSceneContents = function() {
    return this.container;
};

Dnt.GameScene.prototype.update = function() {

};
