import { Faction, Planet, Squadron, Galaxy } from '../../data/galaxyModels';
import { Map } from '../../common/collections';
import { DebugInfo } from '../../common/debug';

export class GalaxyDataHandler {

	private _factions: Map<Faction> = new Map<Faction>();
	private _planets: Map<Planet> = new Map<Planet>();

	private _movingSquadrons: Map<Squadron> = new Map<Squadron>();

	public init(galaxy: Galaxy) {

		galaxy.factions.forEach(faction => {
			this._factions.add(faction.id, faction);
		});

		galaxy.planets.forEach(planet => {
			this._planets.add(planet.id, planet);
		});

		galaxy.squadrons.forEach(squadron => {
			this._movingSquadrons.add(squadron.id, squadron);
		});

		this.updateFactionStats();

		DebugInfo.info(
			`Initialized GalaxyDataHandler: planets: ${this._planets.length} with ${this._movingSquadrons.length} moving squadrons`);
	}

	public get initialized() {
		return this._planets.list.length > 0;
	}

	public get factions(): Map<Faction> {
		return this._factions;
	}

	public get planets(): Map<Planet> {
		return this._planets;
	}

	public get movingSquadrons(): Map<Squadron> {
		return this._movingSquadrons;
	}

	private updateFactionStats() {
		let planets = this._planets.list;

		planets.forEach(planet => {
			if (planet.faction) {
				let planetFaction = this._factions.get(planet.faction.id);
				planetFaction.planets.push(planet);
				planetFaction.maxUpkeep += planet.maxUpkeep;
			}

			let squadrons = planet.squadrons.list;
			squadrons.forEach(squadron => {
				if (squadron.faction) {
					let squadronFaction = this._factions.get(squadron.faction.id);
					squadronFaction.numFighters += squadron.fighters.length;
				}
			});
		});

		let squadrons = this._movingSquadrons.list;
		squadrons.forEach(squadron => {
			if (squadron.faction) {
				let squadronFaction = this._factions.get(squadron.faction.id);
				squadronFaction.numFighters += squadron.fighters.length;
			}
		});
	}
}