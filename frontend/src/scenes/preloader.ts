import { Scenes } from './scenes';
import { Assets } from '../view/assets';
import { SceneEvents } from '../logic/event/eventInterfaces';

class LoadingBar {
    private _container: Phaser.GameObjects.Container;

    public constructor(scene: Phaser.Scene) {
        this._container = scene.add.container(0, 0);
        let bar;

        let progressCounter = scene.add.bitmapText(0, -10, 'progress_counter', '0 %');
        progressCounter.setOrigin(0.5, 0.5);

        this._container.add(
            [
                scene.add.image(0, 0, Assets.ATLAS.PRELOADER, 'circle.png'),
                progressCounter,
                scene.add.image(300, -35, Assets.ATLAS.PRELOADER, 'upper_line.png'),
                scene.add.bitmapText(150, -70, 'font', 'game loading...'),
                bar = scene.add.image(300, 35, Assets.ATLAS.PRELOADER, 'progress_bar.png'),
                scene.add.image(300, 35, Assets.ATLAS.PRELOADER, 'lower_line.png')
            ]);

        const mask = scene.make.graphics({
            x: bar.x - (bar.width / 2),
            y: bar.y - (bar.height / 2),
            add: false
        });
        mask.fillRect(0, 0, 0, bar.height);

        bar.mask = new Phaser.Display.Masks.GeometryMask(scene, mask);

        scene.load.on('progress', (progress: number) => {
            mask.clear();
            mask.fillRect(0, 0, bar.width * progress, bar.height);
            progressCounter.setText(`${Math.floor(progress * 100)}%`);
        });
    }

    public setPosition(x: number, y: number) {
        this._container.setPosition(x, y);
    }

    public destroy() {
        this._container.destroy();
    }
}

export class Preloader extends Phaser.Scene {

    private _assetsLoaded: boolean = false;

    private _backgroundImage: Phaser.GameObjects.Image;

    private _loadingBar: LoadingBar;

    public constructor() {
        super(Scenes.PRELOADER);
    }

    public preload() {
        this._backgroundImage = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'menuBackground');
        this._loadingBar = new LoadingBar(this);
        this._loadingBar.setPosition(this.sys.canvas.width / 2 - 200, this.sys.canvas.height / 2);

        this.loadMainMenuAssets();

        this.sys.game.events.on(SceneEvents.RESIZE, this.resize, this);
        this.resize();
    }

    private loadMainMenuAssets() {
        this.load.setPath('./assets/');

        for (let i = 0; i < 1; i++) {
            this.load.image('logo' + i, './images/mainMenu.jpg');
        }

        // Main Menu
        this.load.image('mainMenu', './images/mainMenu.jpg');
        this.load.atlas(Assets.ATLAS.MAIN_MENU, './spritesheets/main_menu.png', './spritesheets/main_menu.json');
        this.load.bitmapFont('font', './fonts/neuropol-export.png', './fonts/neuropol-export.xml');
        this.load.bitmapFont('font_6', './fonts/neuropol_6-export.png', './fonts/neuropol_6-export.xml');
        this.load.bitmapFont('font_8', './fonts/neuropol_8-export.png', './fonts/neuropol_8-export.xml');

        this.load.atlas(Assets.ATLAS.HUD, './spritesheets/game_gui.png', './spritesheets/game_gui.json');
        this.load.atlas(Assets.ATLAS.FACTIONS, './spritesheets/factions.png', './spritesheets/factions.json');
        this.load.atlas(Assets.ATLAS.AVATARS, './spritesheets/avatars.png', './spritesheets/avatars.json');

        // Test TODO
        this.load.image('infoBox', './images/infoBox.png');
        this.load.bitmapFont('infoText', './fonts/neuropol_18-export.png', './fonts/neuropol_18-export.xml');
        this.load.image('settingsBox', './images/settings_box.png');
        this.load.image('roundButtonActive', './images/round_button_active.png');
        this.load.image('roundButton', './images/round_button.png');
        this.load.image('cancelButton', './images/cancel_button.png');
        this.load.image('playIcon', './images/play_icon.png');
        this.load.image('cancelIcon', './images/cancel_icon.png');
        this.load.image('button', './images/button.png');
        this.load.image('textfield', './images/textfield.png');
        this.load.image('textfieldFocus', './images/textfield_focus.png');
        this.load.image('rightNavigation', './images/right_navigation.png');
        this.load.image('leftNavigation', './images/left_navigation.png');
        this.load.image('menuIcon', './images/menu_icon.png');
        this.load.image('settingsentry', './images/settingsentry.png');
        this.load.image('setttingsokbuttons', './images/setttingsokbuttons.png');

        this.load.image('sliderBox', './images/slider_box.png');
        this.load.image('sliderKnob', './images/slider_knob.png');
        this.load.image('sliderBarEmpty', './images/slider_bar_empty.png');
        this.load.image('sliderBarFull', './images/slider_bar_full.png');
    }

    public create() {
        this._assetsLoaded = true;
    }

    private resize() {

        let width = window.innerWidth;
        let height = window.innerHeight;

        this.cameras.resize(width, height);
        this._backgroundImage.setDisplaySize(width, height);
        this._loadingBar.setPosition(width / 2 - 200, height / 2);
    }

    public update() {
        if (this._assetsLoaded) {
            this._loadingBar.destroy();
            this.scene.start(Scenes.MAIN_MENU);
        }
    }
}