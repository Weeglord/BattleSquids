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

      //if squid has already been placed, this squid is being selected for potential rotation

    }
  }

  rotateSquidHorizontally(): void{
    if(this.started){
      alert("Cannot rotate squids after the game has started.")
      return;
    }else if(!this.selectedSquidPlacement){
      alert("Must select a squid before rotating it.");
      return;
    }

    let occupiedTiles: Tile[] = this.selectedSquidPlacement.tiles;
    let newTiles: Tile[] = [];

    let squidSize = this.selectedSquidPlacement.squid.size;
    for(let i = 0; i < squidSize; i++){
      for(let j = 0; j < squidSize; j++){
        //translating clockwise (by 90 degrees)
         = this.selectedXCoord 
      }
    }
    this.selectedSquidPlacement
  }

  getIsTileOccupied(xPos: number, yPos: number): boolean {
    this.squidPlacements.forEach(placement => {
      placement.tiles.forEach(tile => {
        if(tile.x == xPos && tile.y == yPos){
          return true;
        }
      })
    })
    return false;
  }

  getSquidAtCoordIsVertical(xPos: number, yPos: number): void {
    
  }
}
