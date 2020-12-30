import { Squid } from "./squid";
import { Tile } from "./tile";

export class SquidPlacement{
    squid: Squid;
    tiles: Tile[];
    
    constructor()
    {
        this.squid = new Squid();
        this.tiles = [];
    }
}