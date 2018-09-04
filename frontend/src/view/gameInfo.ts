import { Engine } from '../common/utils';
import { GalaxyDataHandler } from '../logic/galaxyDataHandler';
import { Faction } from '../data/galaxyModels';
import { Player } from '../data/gameData';
import { ObservableServerMessageHandler } from '../communication/messageHandler';
import { MessagePlanetConquered, ServerMessageType, MessagePlayerJoined, MessageFactionDestroyed } from '../communication/communicationInterfaces';
import { Assets } from './assets';

enum GameInfoMessageType {
    PLAYER_JOINED,
    PLANET_CONQUERED,
    FACTION_DESTROYED
}

interface GameInfoMessage {
    text: string;
    color: number;
    type: GameInfoMessageType;
}

class GameInfo extends Phaser.GameObjects.Container {
    public lifetime: number;
}

class GameInfoMessageBuilder {

    private _scene: Phaser.Scene;

    public constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }

    public buildGameInfo(msg: GameInfoMessage): GameInfo {
        let info: GameInfo = null;

        switch (msg.type) {
            case GameInfoMessageType.PLAYER_JOINED:
            case GameInfoMessageType.PLANET_CONQUERED:
            case GameInfoMessageType.FACTION_DESTROYED:
                info = this.buildGameInfoMessage(msg);
                break;
        }
        return info;
    }

    private buildGameInfoMessage(msg: GameInfoMessage): GameInfo {
        let info = new GameInfo(this._scene, 0, 0);

        let infoBox = this._scene.add.sprite(0, 0, Assets.ATLAS.GAME_GUI, 'infoBox.png');
        infoBox.setOrigin(0, 0);
        infoBox.setAlpha(0.75);

        info.add(infoBox);

        let infoText = this._scene.add.text(10, infoBox.height / 2, msg.text,
            {
                wordWrap: { width: infoBox.width },
                fontFamily: 'Calibri', fontSize: 18, fill: '#ffffff'
            });
        infoText.setOrigin(0, 0.5);

        info.add(infoText);

        return info;
    }
}

export class GameInfoHandler {

    private _infoBuilder: GameInfoMessageBuilder;
    private _galaxyDataHandler: GalaxyDataHandler;
    private _infoMessages: GameInfo[] = [];
    private _queuedInfoMessages: GameInfoMessage[] = [];

    private _container: Phaser.GameObjects.Container;

    public constructor(galaxyDataHandler: GalaxyDataHandler, serverMessageObserver: ObservableServerMessageHandler) {

        this._galaxyDataHandler = galaxyDataHandler;

        serverMessageObserver.subscribe<MessagePlayerJoined>(ServerMessageType.PLAYER_JOINED, this.onPlayerJoined.bind(this));
        serverMessageObserver.subscribe<MessagePlanetConquered>(ServerMessageType.PLANET_CONQUERED, this.onPlanetConquered.bind(this));
        serverMessageObserver.subscribe<MessageFactionDestroyed>(ServerMessageType.FACTION_DESTROYED, this.onFactionDestroyed.bind(this));
    }

    public create(scene: Phaser.Scene) {
        this._infoBuilder = new GameInfoMessageBuilder(scene);
        this._container = scene.add.container(20, window.innerHeight - 20);
    }

    private onPlayerJoined(msg: MessagePlayerJoined) {
        let faction = this._galaxyDataHandler.factions[msg.factionId];

        this.addInfoText({
            text: `${faction.name} joined`,
            color: faction.color,
            type: GameInfoMessageType.PLAYER_JOINED
        });
    }

    private onPlanetConquered(msg: MessagePlanetConquered) {
        let faction = this._galaxyDataHandler.factions[msg.factionId];
        let planet = this._galaxyDataHandler.planets[msg.planetId];

        this.addInfoText({
            text: `${faction.name} conquered ${planet.name}`,
            color: faction.color,
            type: GameInfoMessageType.PLANET_CONQUERED
        });
    }

    private onFactionDestroyed(msg: MessageFactionDestroyed) {
        let faction = this._galaxyDataHandler.factions[msg.factionId];

        this.addInfoText({
            text: `${faction.name} has been eliminated`,
            color: faction.color,
            type: GameInfoMessageType.FACTION_DESTROYED
        });
    }

    private addInfoText(msg: GameInfoMessage) {
        this._queuedInfoMessages.push(msg);
    }

    private showInfoText(msg: GameInfoMessage) {
        let info = this._infoBuilder.buildGameInfo(msg);
        info.lifetime = 5000;
        info.x = 0;
        info.y = -70 - this._infoMessages.length * 50;  //TODO replace with info height

        this._container.add(info);

        this._infoMessages.push(info);
    }

    public update(timeElapsed: number) {

        if (this._queuedInfoMessages.length > 0) {
            this._queuedInfoMessages.forEach(msg => {
                this.showInfoText(msg);
            });

            this._queuedInfoMessages.splice(0, this._queuedInfoMessages.length);
        }

        let rearrangeInfos = false;

        this._infoMessages.forEach((info, index) => {
            info.lifetime -= timeElapsed;

            if (info.lifetime < 0) {
                this.removeInfo(info);
                rearrangeInfos = true;
            }
        });

        if (rearrangeInfos) {
            this._infoMessages.forEach((info, index) => {
                info.y = -70 - index * 50; //TODO replace with info height
            });
        }
    }

    private removeInfo(info: GameInfo) {
        this._infoMessages.splice(this._infoMessages.indexOf(info), 1);
        this._container.remove(info, true);
    }
}