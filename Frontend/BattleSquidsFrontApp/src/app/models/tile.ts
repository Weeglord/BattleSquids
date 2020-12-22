import { Squid } from "./squid";
import { TileStatus } from "./tilestatus";

export class Tile {
    id: number;
    boardId: number;
    tileStatus: TileStatus;
    calamari: Squid;
    xPos: number;
    yPos: number;

    constructor () {
        this.id = -1;
        this.boardId = -1;
        this.tileStatus = new TileStatus();
        this.calamari = new Squid();
        this.xPos = -1;
        this.yPos = -1;
    }
}