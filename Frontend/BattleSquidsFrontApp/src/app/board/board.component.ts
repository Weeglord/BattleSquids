import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { Person } from '../models/person';
import { Squid } from '../models/squid';
import { SquidPlacement } from '../models/squidPlacement';
import { Tile } from '../models/tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() player!: Person | null;
  @Input() activePlayer!: Person | null;
  @Input() board!: Board | null;
  @Input() started: boolean = false;
  // selectedTile: Tile | null;
  selectedXCoord: number = 0; //on the player's board, for purposes of placing squids
  selectedYCoord: number = 0; //on the player's board, for purposes of placing squids
  selectedSquid: Squid | null | undefined;
  selectedSquidPlacement: SquidPlacement | null | undefined;
  squidPlacements: SquidPlacement[] = [];

  sideArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  handleTileSelection(xPos: number, yPos: number): void{
    this.selectedSquidPlacement = this.getSquidPlacementAtCoord(xPos, yPos);
    if(this.started){
      if(this.activePlayer == this.player){
        alert("Cannot modify your squid arrangement after the game has started!");
        return;
      }

      //handle active player selecting this player's tile:
      if(this.getIsTileOccupied(xPos, yPos)){
        //change img...
        alert("Hit!");
      }else{
        alert("Miss!");
        return;
      }
    }else if(this.player){
      //handle placement of squid:
      if(!this.selectedSquid){
        alert("Select a squid type before placing!");
        return;
      }

      //see if squid has already been placed:
      if(!this.selectedSquidPlacement){
        //if the squid has not been placed, place squid:
        let newTiles: Tile[] = [];
        
        let newPlacement = new SquidPlacement();
        //the xPos and yPos of the selected tile will be the central tile the squid occupies,
        //and by default squids will be placed vertically
        const squidSize = this.selectedSquid.size;
        for(let i = 0; i < squidSize; i++){
          let newX = xPos; //vertical placement, so same x for all tiles
          let halfSize = Math.round(squidSize/2); //distance from center to either end
          let startingY = yPos - halfSize;
          let newY = startingY + i;

          if(this.getIsTileOccupied(newX, newY)){
            alert("Squids cannot overlap!");
            return;
          }else if(newY > 10 || newY < 1){
            alert("Squids cannot be placed outside the boundaries!");
            return;
          }
          
          let replacementTile = new Tile();
          replacementTile.x = newX;
          replacementTile.y = newY;
          
          newTiles.push(replacementTile);
        }
        newPlacement.squid = this.selectedSquid;
        newPlacement.tiles = newTiles;
        this.selectedSquidPlacement = newPlacement;

        return;
      }
      //if squid has already been placed, this squid is being selected for potential rotation
      this.rotateSquid();
    }
  }

  rotateSquid(): void{
    if(this.started){
      alert("Cannot rotate squids after the game has started.")
      return;
    }else if(!this.selectedSquidPlacement){
      alert("Must select a squid before rotating it.");
      return;
    }

    let placement = this.selectedSquidPlacement;
    const tiles: Tile[] = placement.tiles;
    let newTiles: Tile[] = [];
    const isVertical = this.getSquidPlacementIsVertical(placement);

    const squidSize = this.selectedSquidPlacement.squid.size;
    let halfSize = Math.round(squidSize/2); //distance from center to either end
    const centralXPos = this.selectedSquidPlacement.tiles[halfSize].x;
    const centralYPos = this.selectedSquidPlacement.tiles[halfSize].y;

    if(isVertical){
      for(let i = 0; i < squidSize; i++){
        let startingX = centralXPos - halfSize;
        let newX = startingX + i;
        let newY = centralYPos; //newly horizontal placement, so same y for all tiles
        
        if(this.getIsTileOccupied(newX, newY)){
          alert("Squids cannot overlap!");
          return;
        }else if(newX > 10 || newX < 1){
          alert("Squids must remain within the boundaries!");
          return;
        }else{
          let replacementTile: Tile = new Tile();
          replacementTile.x = newX;
          replacementTile.y = newY;
          newTiles.push(replacementTile);
        }
      }
    }else{
      for(let i = 0; i < squidSize; i++){
        let newX = centralXPos; //newly vertical placement, so same x for all tiles
        let startingY = centralYPos - halfSize;
        let newY = startingY + i;
        
        if(this.getIsTileOccupied(newX, newY)){
          alert("Squids cannot overlap!");
          return;
        }else if(newY > 10 || newY < 1){
          alert("Squids must remain within the boundaries!");
          return;
        }else{
          let replacementTile: Tile = new Tile();
          replacementTile.x = newX;
          replacementTile.y = newY;
          newTiles.push(replacementTile);
        }
      }
    }
    //at this point, the placed squid has been rotated
    //without exceeding boundaries or overlapping other squids
    this.selectedSquidPlacement.tiles = newTiles;
  }

  getIsTileOccupied(xPos: number, yPos: number): boolean {
    this.squidPlacements.forEach(placement => {
      placement.tiles.forEach(tile => {
        if(tile.x == xPos && tile.y == yPos){
          return true;
        }
      });
    });
    return false;
  }

  getSquidPlacementIsVertical(placement: SquidPlacement): boolean | null { 
    let firstY = placement.tiles[0].y;
    let secondY = placement.tiles[1].y;

    return secondY !== firstY;
  }

  getSquidPlacementAtCoord(xPos: number, yPos: number): SquidPlacement | null {
      this.squidPlacements.forEach(placement => {
        placement.tiles.forEach(tile => {
          if(tile.x == xPos && tile.y == yPos){
            return placement;
          }
        });
      });
      return null;
  }
}
