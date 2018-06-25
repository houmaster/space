
export enum ClientMessageType {
    JOIN_GAME = 'joinGame',
    SEND_SQUADRON = 'sendSquadron'
}

export interface ClientMessage {
    action: string;
}

export interface JoinMessage extends ClientMessage {
    gameId: number;
}

export interface SendSquadron extends ClientMessage {
    sourcePlanetId: number;
    targetPlanetId: number;
    shipIds: number[];
}

export enum ServerMessageType {
    GAME_JOINED = 'gameJoined',
    PLAYER_JOINED = 'playerJoined',
    GAME_UPDATED = 'gameUpdated',
    FIGHTER_CREATED = 'fighterCreated'
}

export interface ServerMessage {
    event: string;
}

export interface MessageGameJoined extends ServerMessage {
    planets: PlanetInfo[];
    factions: FactionInfo[];
}

export interface PlanetInfo {
    id: number;
    name: string;
    initialAngle: number;
    angularVelocity: number;
    distance: number;
    parent: number;
    owner: number;
    squadrons: SquadronInfo[];
}

export interface FactionInfo {
    id: number;
    name: string;
}

export interface SquadronInfo {
    squadronId: number;
    fighterCount: number;
    factionId: number;
}

export interface MessagePlayerJoined extends ServerMessage {
    factionId: number;
}

export interface MessageGameUpdated extends ServerMessage {
    time: number;
}

export interface MessageFighterCreated extends ServerMessage {
    planetId: number;
    squadronId: number;
    fighterCount: number;
}