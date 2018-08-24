import { Scenes } from './scenes';
import { InputHandler } from '../input/selectionHandler';
import { GameTimeHandler } from '../logic/gameTimeHandler';
import { ClientMessageSender } from '../communication/communicationHandler';
import { Galaxy, Player } from '../data/galaxyModels';
import { Camera } from '../view/camera';
import { Background } from '../view/background';
import { ObservableServerMessageHandler } from '../communication/messageHandler';

export class GameScene extends Phaser.Scene {

	private _camera: Camera;

	private _galaxy: Galaxy;
	private _player: Player;

	private _inputHandler: InputHandler;
	private _timeHandler: GameTimeHandler;
	private _clientMessageSender: ClientMessageSender;
	private _serverMessageObserver: ObservableServerMessageHandler;

	private _graphics: Phaser.GameObjects.Graphics;

	public constructor() {
		super(Scenes.GAME);
	}

	public init(data: any) {

		this._clientMessageSender = data.clientMessageSender;
		this._serverMessageObserver = data.serverMessageObserver;

		let gameState = data.gameState;

		this._galaxy = gameState.galaxy;
		this._player = gameState.player;
	}

	public create() {
		this._timeHandler = new GameTimeHandler(this._serverMessageObserver);

		this._camera = new Camera(this.cameras.main);
		this.cameras.main.setSize(2048, 2048);
		this._camera.setDeltaPosition(-6000, -6000);

		new Background(this).create();

		this._galaxy.planets.forEach(planet => {
			planet.sprite = this.add.sprite(0, 0, planet.parent ? 'planet' : 'sun');
			planet.sprite.setScale(planet.parent ? 0.25 : 0.35);
			planet.sprite.setInteractive();
			planet.sprite.on('pointerdown', () => {
				//	this._selectionHandler.selectPlanet(planet);
			});
		});

		this._inputHandler = new InputHandler(this, this._camera, this._player, this._galaxy.planets, this._clientMessageSender);
		this._graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000, alpha: 1 } });

		this.sys.game.events.on('resize', this.resize, this);
		this.resize();

		this.cameras.main.fadeIn(1000);
	}

	private resize() {
		let cam = this.cameras.main;
		cam.setViewport(0, 0, window.innerWidth, window.innerHeight);
		cam.centerToBounds();

		cam.zoom = Math.min(window.innerWidth / 1024, window.innerHeight / 768);
	}

	public update(timeSinceStart: number, timeSinceLastFrame: number) {

		this._camera.update(timeSinceLastFrame);

		this._timeHandler.addLocalElapsedTime(timeSinceLastFrame);
		let timeElapsed = this._timeHandler.timeSinceStart;

		this._galaxy.planets.forEach(planet => {
			let angle = planet.initialAngle + planet.angularVelocity * timeElapsed;
			planet.x = Math.cos(angle) * planet.distance;
			planet.y = Math.sin(angle) * planet.distance;
			if (planet.parent) {
				planet.x += planet.parent.x;
				planet.y += planet.parent.y;
			}

			planet.sprite.x = planet.x;
			planet.sprite.y = planet.y;
		});

		this._graphics.clear();

		this._galaxy.planets.forEach(planet => {
			if (planet.faction) {
				this._graphics.lineStyle(4, planet.faction.color, 1);

				this._graphics.strokeCircle(
					planet.x,
					planet.y,
					30
				);
			}
		});

		this._inputHandler.update();
	}

	public shutdown() {
		this.sys.game.events.off('resize', this.resize, this, true);
	}
}