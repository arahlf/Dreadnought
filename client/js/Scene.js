
Dread.define('Dread.Scene', {

    constructor: function(sceneManager) {
        this.sceneManager = sceneManager;
        this.displayObjectContainer = new PIXI.DisplayObjectContainer();
    },

    getSceneContents: function() {
        return this.displayObjectContainer;
    },

    update: Dread.abstractFn
});
