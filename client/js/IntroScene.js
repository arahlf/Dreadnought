Dnt.IntroScene = function(sceneManager) {
    Dnt.Scene.call(this);

    this.container = new PIXI.DisplayObjectContainer();

    var title = new PIXI.Text("Dreadnought", { font: '35px Verdana' });
    title.x = Math.round((Dnt.WIDTH / 2) - (title.width / 2));
    title.y = 75;

    this.container.addChild(title);

    var play = this.createMenuOptionText('play');
    play.x = Math.round((Dnt.WIDTH / 2) - (play.width / 2));
    play.y = 175;

    var settings = this.createMenuOptionText('settings');
    settings.x = Math.round((Dnt.WIDTH / 2) - (settings.width / 2));
    settings.y = 215;

    var about = this.createMenuOptionText('about');
    about.x = Math.round((Dnt.WIDTH / 2) - (about.width / 2));
    about.y = 255;

    this.container.addChild(play);
    this.container.addChild(settings);
    this.container.addChild(about);

    play.click = function() {
        var gameScene = new Dnt.GameScene(sceneManager);

        sceneManager.setActiveScene(gameScene);
    };
};

Dnt.IntroScene.prototype = Object.create(Dnt.Scene.prototype);
Dnt.IntroScene.prototype.constructor = Dnt.IntroScene;

Dnt.IntroScene.prototype.getSceneContents = function() {
    return this.container;
};

Dnt.IntroScene.prototype.update = function() {

};

Dnt.IntroScene.prototype.createMenuOptionText = function(text) {
    var styles = { font: '20px Verdana' };
    var text = new PIXI.Text(text, styles);
    var leftBrace = new PIXI.Text('[', styles);
    var rightBrace = new PIXI.Text(']', styles);

    leftBrace.alpha = rightBrace.alpha = 0;

    leftBrace.x = -10 - leftBrace.width;
    rightBrace.x = text.width + 10;

    text.interactive = true;

    text.addChild(leftBrace);
    text.addChild(rightBrace);

    text.mouseover = function() {
        leftBrace.alpha = rightBrace.alpha = 1;
    };

    text.mouseout = function() {
        leftBrace.alpha = rightBrace.alpha = 0;
    };

    return text;
};
