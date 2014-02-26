
Dread.define('Dread.IntroScene', Dread.Scene, {

    constructor: function(sceneManager) {
        this.callParent(arguments);

        var title = new PIXI.Text("Dreadnought", { font: '35px Verdana' });
        title.x = Math.round((Dread.WIDTH / 2) - (title.width / 2));
        title.y = 75;

        this.displayObjectContainer.addChild(title);

        var play = this._createMenuOptionText('play');
        play.x = Math.round((Dread.WIDTH / 2) - (play.width / 2));
        play.y = 175;

        var settings = this._createMenuOptionText('settings');
        settings.x = Math.round((Dread.WIDTH / 2) - (settings.width / 2));
        settings.y = 215;

        var about = this._createMenuOptionText('about');
        about.x = Math.round((Dread.WIDTH / 2) - (about.width / 2));
        about.y = 255;

        this.displayObjectContainer.addChild(play);
        this.displayObjectContainer.addChild(settings);
        this.displayObjectContainer.addChild(about);

        play.click = function() {
            var gameScene = new Dread.GameScene(sceneManager);

            sceneManager.setActiveScene(gameScene);
        };
    },

    update: function() {
    },

    _createMenuOptionText: function(text) {
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
    }
});
