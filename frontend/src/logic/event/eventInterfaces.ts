
import { Fighter, Faction, Planet, Squadron } from '../../data/galaxyModels';
import { Observer } from '../../common/commonInterfaces';

// todo separate sys game hud event
export const enum SceneEvents {
	RESIZE = 'resize',
	DISCONNECTED = 'disconnected',
	CLICKED_ON_INFO = 'clickedOnInfo',
	PLANET_SELECTION_CHANGED = 'planetSelectionChanged'
}

export interface GameEventNotifier {
	notify<T extends GameEvent>(eventId: string, event: T);
}

export interface GameEventObserver extends Observer {

	subscribe<T extends GameEvent>(eventId: string, callback: HandleGameEvent<T>);

	unsubscribe<T extends GameEvent>(eventId: string, callback: HandleGameEvent<T>);
}

export const enum GameEventType {
	PLAYER_JOINED = 'playerJoined',
	FIGHTER_CREATED = 'fighterCreated',
	FIGHTER_DESTROYED = 'fighterDestroyed',
	SQUADRON_CREATED = 'squadronCreated',
	SQUADRON_ATTACKS_PLANET = 'squadronAttacksPlanet',
	SQUADRON_DESTROYED = 'squadronDestroyed',
	PLANET_CONQUERED = 'planetConquered',
	FACTION_DESTROYED = 'factionDestroyed',
	FACTION_WON = 'factionWon'
}

export interface HandleGameEvent<T extends GameEvent> {
	(msg: T): void;
}

export interface GameEvent {
	type: string;
}

export interface EventPlayerJoined extends GameEvent {
	faction: Faction;
	planet: Planet;
}

export interface EventFighterCreated extends GameEvent {
	fighter: Fighter;
}

export interface EventFighterDestroyed extends GameEvent {
	fighter: Fighter;
}

export interface EventSquadronCreated extends GameEvent {
	squadron: Squadron;
}

export interface EventSquadronAttacksPlanet extends GameEvent {
	planet: Planet;
	squadron: Squadron;
}

export interface EventSquadronDestroyed extends GameEvent {
	planet: Planet;
	squadron: Squadron;
}

export interface EventPlanetConquered extends GameEvent {
	planet: Planet;
	faction: Faction;
}

export interface EventFactionDestroyed extends GameEvent {
	faction: Faction;
}

export interface EventFactionWon extends GameEvent {
	faction: Faction;
}