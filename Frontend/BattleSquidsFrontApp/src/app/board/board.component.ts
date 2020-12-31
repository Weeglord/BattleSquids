import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Board } from '../models/board';
import { Game } from '../models/game';
import { Person } from '../models/person';
import { Tile } from '../models/tile';
import { PersonService } from '../services/person.service';
import { TileService } from '../services/tile.service';
import { TilestatusService } from '../services/tilestatus.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{
 
  @Input() player!: Person| null;
  @Input() board!: Board | null;

  @Input() invitePerson!: Person |null;
  @Input() initEvent!: Observable<void>;
  //private eventsSubscription!: Subscription;
  game!: Game;

  sideArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private tileServ: TileService, private tileStatServ: TilestatusService, private personServ: PersonService)
  {
    tileServ.openTileWebSocket(this, personServ.getLoggedUser().id);
    console.log(JSON.parse(window.sessionStorage.getItem("game") as string));
  }
  /*
  ngOnInit(): void
  {
    this.eventsSubscription = this.initEvent.subscribe(resp => {console.log("Event receiver"); this.initBoard()});
    console.log(this.initEvent);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe()
  }
  */

  async initBoard(isBoard1: boolean)
  {
    console.log("initializing board")
    this.game = JSON.parse(window.sessionStorage.getItem("game") as string);
    if(isBoard1)
    {
      this.board = this.game.board1;
    }
    else{
      this.board = this.game.board2;
    }
    console.log(this.board);
  }

  async inkTile(x: number,y: number)
  {
    let tile: Tile;
    if (this.board)
    {
      console.log(this.board);
      tile = this.board.tiles[x-1][y-1];
      if (tile.status.id == 1)
      {
        tile.status = await this.tileStatServ.getTileStatusById(2).toPromise();
        this.tileServ.sendTile(tile);
      }
      else{
        alert("Tile has already been inked!");
      }
    }
    
  }

  updateTile(tile: Tile)
  {
    if(this.board)
    {
      this.board.tiles[tile.x][tile.y] = tile;
    }
  }

}
