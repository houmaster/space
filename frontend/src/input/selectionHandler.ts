import { Planet, Squadron } from '../model/galaxyModels';
import { ClientMessageSender } from '../communication/communicationHandler';

export class SelectionArrow {

    private _planet: Planet;
    private _shaft: Phaser.GameObjects.Quad;

    public create(scene: Phaser.Scene, planet: Planet) {
        this._planet = planet;


        this._shaft = scene.add.quad(planet.x, planet.y, 'pixel');
    }

    public update(x: number, y: number) {

        this._shaft.setTopLeft(this._planet.x - 10, this._planet.y - 10);
        this._shaft.setTopRight(this._planet.x + 10, this._planet.y + 10);

        this._shaft.setBottomLeft(x - 10, y - 10);
        this._shaft.setBottomRight(x + 10, y + 10);
    }

    public destroy() {
        this._shaft.destroy();
    }
}
/**
 *
 * TODO: separate rendering and logic into separate classes
 *
 */

export const PLAYER_FACTION_ID = 1; // TODO remove hardcoded

export class SelectionHandler { // InputHandler

    private _scene: Phaser.Scene;
    private _camera: Phaser.Cameras.Scene2D.Camera;
    private _clientMessageSender: ClientMessageSender;

    private _rect: Phaser.Geom.Rectangle;
    private _graphics: any;

    private _allPlanets: Planet[];
    private _selectedPlanets: Planet[] = [];

    public constructor(scene: Phaser.Scene, camera: Phaser.Cameras.Scene2D.Camera, planets: Planet[], clientMessageSender: ClientMessageSender) {
        this._scene = scene;
        this._camera = camera;
        this._allPlanets = planets;
        this._clientMessageSender = clientMessageSender;

        this._rect = new Phaser.Geom.Rectangle(350, 250, 100, 100);
        this._graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0xffffff }, fillStyle: { color: 0x00aa00 } });
    }

    private getWorldPosition(x: number, y: number): Vector2Like {
        let worldPos: Vector2Like = this._camera.getWorldPoint(x, y);
        return worldPos;
    }

    public update() {

        if (this._selectedPlanets.length > 0) {
            this._graphics.clear();

            this._selectedPlanets.forEach(planet => {
                this._graphics.strokeRectShape({
                    x: planet.x - 25,
                    y: planet.y - 25,
                    width: 50,
                    height: 50
                });
            });
        }
    }

    private planetUnderCursor(x: number, y: number): Planet {
        let size = 50;
        let worldPos = this.getWorldPosition(x, y);
        let pickRect = new Phaser.Geom.Rectangle(worldPos.x - size / 2, worldPos.y - size / 2, size, size);

        let numPlanets = this._allPlanets.length;
        let planet: Planet;
        for (let p = 0; p < numPlanets; p++) {
            planet = this._allPlanets[p];
            if (pickRect.contains(planet.x, planet.y)) {
                return planet;
            }
        }
        return null;
    }

    public onStartSelect(x: number, y: number) {

        // check if planet under cursor
        if (this.planetUnderCursor(x, y) !== null) {
            // else draw drag arrow
            this.createSelectionArrows();
        } else {
            this._selectedPlanets.splice(0); // if no splice seleced

            let worldPos = this.getWorldPosition(x, y);
            this._rect.x = worldPos.x;
            this._rect.y = worldPos.y;
        }
    }

    private _selectionArrows: SelectionArrow[] = [];

    private createSelectionArrows() {
        this._selectionArrows = [];

        this._selectedPlanets.forEach(planet => {
            let arrow = new SelectionArrow();
            arrow.create(this._scene, planet);
            this._selectionArrows.push(arrow);

            console.log('pushed arrow');
        });
    }

    private destroySelectionArrows() {
        this._selectionArrows.forEach(arrow => {
            arrow.destroy();
        });

        this._selectionArrows = [];
    }

    public onEndSelect(x: number, y: number) {

        if (this._selectionArrows.length > 0) {

            let targetPlanet = this.planetUnderCursor(x, y);
            if (targetPlanet !== null) {
                console.log('send them to planet ' + targetPlanet.id);
                let sourcePlanet = this._selectedPlanets[0];
                let squadron: Squadron = sourcePlanet.squadrons[0]; // TODO Player
                this._clientMessageSender.sendSquadron(sourcePlanet.id, targetPlanet.id, squadron.fighters.length);
            }

            this._selectedPlanets.splice(0);
        } else {
            this._selectedPlanets.splice(0);

            this._allPlanets.forEach(planet => {
                if (this._rect.contains(planet.x, planet.y) && planet.faction && planet.faction.id === PLAYER_FACTION_ID) {
                    this._selectedPlanets.push(planet);
                }
            });
        }

        this._graphics.clear();
        this.destroySelectionArrows();
    }

    public onSelectPosChanged(x: number, y: number) {
        let worldPos = this.getWorldPosition(x, y);

        if (this._selectionArrows.length === 0) {
            this._rect.width = worldPos.x - this._rect.x;
            this._rect.height = worldPos.y - this._rect.y;

            this._graphics.clear();
            this._graphics.strokeRectShape(this._rect);

        } else {
            console.log('update arrows');
            this._selectionArrows.forEach(arrow => {
                arrow.update(worldPos.x, worldPos.y);
            });
        }
    }
}