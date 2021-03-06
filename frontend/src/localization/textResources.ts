import { DebugInfo } from '../common/debug';

class TextResourcesCommon {
	public readonly CANCEL = 'common.cancel';
	public readonly SERVER = 'common.server';
	public readonly MAIN_MENU = 'common.mainMenu';
	public readonly BACK = 'common.back';
}

class TextResourcesMenu {
	public readonly TITLE = 'mainMenu.title';
	public readonly PLAY = 'mainMenu.play';
	public readonly OPTIONS = 'mainMenu.options';
	public readonly QUIT = 'mainMenu.quit';
}

class TextResourcesChooseGameType {
	public readonly TITLE = 'chooseGameType.title';
	public readonly HEADER = 'chooseGameType.header';
	public readonly CREATE_NEW_GAME = 'menu.createNewGame';
	public readonly JOIN_GAME = 'menu.joinGame';
}

class TextResourcesCreateNewGame {
	public readonly TITLE = 'createNewGame.title';
	public readonly CREATE = 'createNewGame.create';
	public readonly NUM_PLANETS = 'createNewGame.numPlanets';
	public readonly NUM_FACTIONS = 'createNewGame.numFactions';
}

class TextResourcesSelectGame {
	public readonly TITLE = 'selectGame.title';
	public readonly SESSIONS = 'selectGame.sessions';
	public readonly CONNECT = 'selectGame.connect';
	public readonly JOIN = 'selectGame.join';
}

class TextResourcesPlayerSettings {
	public readonly TITLE = 'playerSettings.title';
	public readonly NAME = 'playerSettings.name';
	public readonly COLOR = 'playerSettings.color';
}

class TextResourcesLobby {
	public readonly TITLE = 'lobby.title';
}

class TextResourcesInitGame {
	public readonly TITLE = 'initGame.title';
	public readonly JOINING_GAME = 'initGame.joiningGame';
}

class TextResourcesGame {
	//---- Planet info ---------------
	public readonly FACTION = 'game.faction';
	public readonly MAINTAINANCE = 'game.maintainance';
	public readonly PRODUCTIVITY = 'game.productivity';
	public readonly DEFENSE = 'game.defense';
	public readonly FIGHTERS = 'game.fighters';

	//---- Infobox --------------
	// player
	public readonly PLAYER_ATTACK_FAILED = 'game.playerAttackFailed';
	public readonly PLAYER_PLANET_UNDER_ATTACK = 'game.playerPlanetUnderAttack';
	public readonly PLAYER_REPELLED_ATTACK = 'game.playerRepelledAttack';
	public readonly PLAYER_CONQUERED_PLANET = 'game.playerConqueredPlanet';
	public readonly PLAYER_PLANET_LOST = 'game.planetLost';
	public readonly PLAYER_GAME_OVER = 'game.playerGameOver';
	public readonly PLAYER_WON_GAME = 'game.playerWonGame';

	// factions
	public readonly FACTION_CONQUERED_PLANET = 'game.factionConqueredPlanet';
	public readonly FACTION_JOINED = 'game.factionJoined';
	public readonly FACTION_DESTROYED = 'game.factionDestroyed';
}

class TextResourcesError {
	public readonly CONNECTION_FAILED = 'error.connectionfailed';
}

export class Texts {
	public static readonly COMMON: TextResourcesCommon = new TextResourcesCommon();
	public static readonly MAIN_MENU: TextResourcesMenu = new TextResourcesMenu();
	public static readonly CHOOSE_GAME_TYPE: TextResourcesChooseGameType = new TextResourcesChooseGameType();
	public static readonly SELECT_GAME: TextResourcesSelectGame = new TextResourcesSelectGame();
	public static readonly CREATE_NEW_GAME: TextResourcesCreateNewGame = new TextResourcesCreateNewGame();
	public static readonly PLAYER_SETTINGS: TextResourcesPlayerSettings = new TextResourcesPlayerSettings();
	public static readonly LOBBY: TextResourcesLobby = new TextResourcesLobby();
	public static readonly INIT_GAME: TextResourcesInitGame = new TextResourcesInitGame();
	public static readonly GAME: TextResourcesGame = new TextResourcesGame();
	public static readonly ERROR: TextResourcesError = new TextResourcesError();
}

export class TextResources {
	private static _resources: { [key: string]: string; } = {};

	public static initialize() {

		TextResources._resources[Texts.COMMON.CANCEL] = 'cancel';
		TextResources._resources[Texts.COMMON.SERVER] = 'Server';
		TextResources._resources[Texts.COMMON.MAIN_MENU] = 'Main Menu';
		TextResources._resources[Texts.COMMON.BACK] = 'Back';

		TextResources._resources[Texts.MAIN_MENU.TITLE] = 'main menu';
		TextResources._resources[Texts.MAIN_MENU.PLAY] = 'play';
		TextResources._resources[Texts.MAIN_MENU.OPTIONS] = 'options';
		TextResources._resources[Texts.MAIN_MENU.QUIT] = 'quit';

		TextResources._resources[Texts.CHOOSE_GAME_TYPE.TITLE] = 'Choose game type';
		TextResources._resources[Texts.CHOOSE_GAME_TYPE.HEADER] = 'Select game';
		TextResources._resources[Texts.CHOOSE_GAME_TYPE.CREATE_NEW_GAME] = 'create new';
		TextResources._resources[Texts.CHOOSE_GAME_TYPE.JOIN_GAME] = 'join existing';

		TextResources._resources[Texts.CREATE_NEW_GAME.TITLE] = 'Create new game';
		TextResources._resources[Texts.CREATE_NEW_GAME.CREATE] = 'Create';
		TextResources._resources[Texts.CREATE_NEW_GAME.NUM_FACTIONS] = '# factions';
		TextResources._resources[Texts.CREATE_NEW_GAME.NUM_PLANETS] = '# planets';

		TextResources._resources[Texts.SELECT_GAME.TITLE] = 'Select game';
		TextResources._resources[Texts.SELECT_GAME.SESSIONS] = 'Sessions';
		TextResources._resources[Texts.SELECT_GAME.CONNECT] = 'Connect';
		TextResources._resources[Texts.SELECT_GAME.JOIN] = 'Join';

		TextResources._resources[Texts.PLAYER_SETTINGS.TITLE] = 'Player settings';
		TextResources._resources[Texts.PLAYER_SETTINGS.NAME] = 'Name';
		TextResources._resources[Texts.PLAYER_SETTINGS.COLOR] = 'Color';

		TextResources._resources[Texts.LOBBY.TITLE] = 'lobby';

		TextResources._resources[Texts.INIT_GAME.TITLE] = 'loading game';
		TextResources._resources[Texts.INIT_GAME.JOINING_GAME] = 'joining game';

		//---- Planet info ---------------
		TextResources._resources[Texts.GAME.FACTION] = 'faction';
		TextResources._resources[Texts.GAME.MAINTAINANCE] = 'maintainance';
		TextResources._resources[Texts.GAME.PRODUCTIVITY] = 'productivity';
		TextResources._resources[Texts.GAME.DEFENSE] = 'defense';
		TextResources._resources[Texts.GAME.FIGHTERS] = 'fighters';

		//---- Infobox --------------
		// player
		TextResources._resources[Texts.GAME.PLAYER_ATTACK_FAILED] = 'Our attack on {0} has failed';
		TextResources._resources[Texts.GAME.PLAYER_PLANET_UNDER_ATTACK] = 'Our base at {0} is under attack by {1}!';
		TextResources._resources[Texts.GAME.PLAYER_REPELLED_ATTACK] = 'Our brave forces could repell the attack on {0}!';
		TextResources._resources[Texts.GAME.PLAYER_CONQUERED_PLANET] = 'Our brave forces conquered {0}!';
		TextResources._resources[Texts.GAME.PLAYER_PLANET_LOST] = 'We lost {0} to {1}';
		TextResources._resources[Texts.GAME.PLAYER_GAME_OVER] = 'Our desperate struggle has come to an end!';
		TextResources._resources[Texts.GAME.PLAYER_WON_GAME] = 'We have won!';

		// factions
		TextResources._resources[Texts.GAME.FACTION_JOINED] = '{0} joined';
		TextResources._resources[Texts.GAME.FACTION_DESTROYED] = '{0} has been eliminated';
		TextResources._resources[Texts.GAME.FACTION_CONQUERED_PLANET] = '{0} conquered {1}';

		TextResources._resources[Texts.ERROR.CONNECTION_FAILED] = 'connection failed';
	}

	public static getText(key: string): string {
		let text = TextResources._resources[key];
		if (text) {
			return text;
		}
		DebugInfo.warn(`${key} not found!`);
		return `[${key}]`;
	}
}
TextResources.initialize();
