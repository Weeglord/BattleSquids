import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { Person } from '../models/person';
import { Squid } from '../models/squid';
import { Tile } from '../models/tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() player!: Person | null;
  @Input() board!: Board | null;
  // selectedTile: Tile | null;
  selectedXCoord: number | null | undefined; //on the player's board, for purposes of placing squids
  selectedYCoord: number | null | undefined; //on the player's board, for purposes of placing squids
  selectedSquid: Squid | null | undefined;

  sideArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selectTile(xCoord: number, yCoord: number): void {
    this.selectedXCoord = xCoord;
    this.selectedYCoord = yCoord;
    if(){

    }
  }
}
