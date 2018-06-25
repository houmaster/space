import { ServerMessageType, MessageGameJoined, ServerMessage, PlanetInfo, ClientMessage, ClientMessageType, JoinMessage, SendSquadron } from './communicationInterfaces';
import { SpaceGame } from '../Game';
import { ServerMessageHandler } from './messageHandler';

export class ClientMessageSender {

    private _communicationHandler: CommunicationHandler;

    public constructor(communicationHandler: CommunicationHandler) {
        this._communicationHandler = communicationHandler;
    }

    public joinGame(gameId: number) {
        let msg: JoinMessage = {
            action: ClientMessageType.JOIN_GAME,
            gameId: gameId
        };

        this.send(msg);
    }

    public sendSquadron(sourcePlanetId: number, targetPlanetId: number, shipIds: number[]) {
        let msg: SendSquadron = {
            action: ClientMessageType.SEND_SQUADRON,
            sourcePlanetId: sourcePlanetId,
            targetPlanetId: targetPlanetId,
            shipIds: shipIds
        };

        this.send(msg);
    }

    private send(msg: ClientMessage) {
        try {
            this._communicationHandler.send(msg);
        } catch (error) {
            alert(error);
        }
    }
}

export class CommunicationHandler {

    private _socket: any;
    private _messageHandler: ServerMessageHandler;

    public onConnectionEstablished: Function;

    public constructor(messageHandler: ServerMessageHandler) {
        this._messageHandler = messageHandler;
    }

    public init() {
        let url = 'ws://127.0.0.1:9995/';
        this._socket = new WebSocket(url, 'websocket');

        this._socket.onopen = () => {
            if (this.onConnectionEstablished) {
                this.onConnectionEstablished();
            }
            // this._socket.send('{ "action": "sendSquadron", sourcePlanetId: 1, targetPlanetId: 2, shipIds: [1,2,3,4] }');
        };
        this._socket.onclose = function () {
            console.log('Disonnected from server');
        };
        this._socket.onmessage = (event: any) => {

            try {
                let msg = JSON.parse(event.data);
                this._messageHandler.handle(msg);

            } catch (e) {
                console.log(JSON.stringify(event) + ' exception with ' + event.data);
            }
        };
        Object.seal(this._socket);
    }

    private instanceOfServerMessage(object: any): object is ServerMessage {
        return 'event' in object;
    }

    public send(msg: ClientMessage) {
        try {
            let jsonMessage = JSON.stringify(
                msg
            );
            console.log(`Sending ${jsonMessage} to server.`);
            this._socket.send(jsonMessage);
        } catch (e) {
            alert(e);
        }
    }
}