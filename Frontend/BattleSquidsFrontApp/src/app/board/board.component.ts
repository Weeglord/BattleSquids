import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Board } from '../models/board';
import { Game } from '../models/game';
import { Person } from '../models/person';
import { Tile } from '../models/tile';
import { PersonService } from '../services/person.service';
import { SquidService } from '../services/squid.service';
import { TileService } from '../services/tile.service';
import { TilestatusService } from '../services/tilestatus.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() player!: Person| null;
  @Input() board!: Board | null;
  @Input() initEvent!: Observable<void>;
  //private eventsSubscription!: Subscription;
  game!: Game;
  ready: boolean = false;
  primary!: boolean;
  squidSelect: number = -1;
  verticalPlacement: boolean = true
  imagePaths: string[][];
  placedSquids: boolean[] = [false, false, false, false, false];


  sideArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private tileServ: TileService, private tileStatServ: TilestatusService, private personServ: PersonService, private squidServ: SquidService)
  {
    tileServ.openTileWebSocket(this, personServ.getLoggedUser().id);
    console.log(JSON.parse(window.sessionStorage.getItem("game") as string));
    this.imagePaths = new Array<Array<string>>(10);
    for(let i = 0; i < 10; i++)
    {
        
        this.imagePaths[i] = new Array<string>(10);
    }
    for(let i = 0; i < 10; i++)
    {
      for(let j = 0; j < 10; j++)
      {
        
        this.imagePaths[i][j] = "../../assets/tile_empty.png";
        //console.log(this.imagePaths[i][j]);
      }
    }
    //console.log(this.imagePaths);
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

  async selectSquid(squidId: number)
  {
    if (this.placedSquids[squidId-1])
    {
      alert("squid already placed!, please choose a different squid!");
      this.squidSelect = -1;
      return;
    }
    if(squidId == 1)
    {
      this.squidSelect= 1;
    }
    if(squidId == 2)
    {
      this.squidSelect= 2;
    }
    if(squidId == 3)
    {
      this.squidSelect= 3;
    }
    if(squidId == 4)
    {
      this.squidSelect= 4;
    }
    if(squidId == 5)
    {
      this.squidSelect= 5;
    }
  }

  changePlacementOrientation(horizontal: boolean)
  {
    if (horizontal)
    {
      this.verticalPlacement = false;
    }
    else{
      this.verticalPlacement = true;
    }
  }

  //place is 1 indexed
  getAssetFromSquidId(squidId: number, place: number): string
  {
    if(squidId == 1 && place == 1)
    {
      return "../../assets/tile_cuttle_1.png"
    }
    else if(squidId == 1 && place == 2)
    {
      return "../../assets/tile_cuttle_2.png"
    }
    else if(squidId == 2 && place == 1)
    {
      return "../../assets/tile_vampire_1.png"
    }
    else if(squidId == 2 && place == 2)
    {
      return "../../assets/tile_vampire_2.png"
    }
    else if(squidId == 2 && place == 3)
    {
      return "../../assets/tile_vampire_3.png"
    }
    else if(squidId == 3 && place == 1)
    {
      return "../../assets/tile_humboldt_1.png"
    }
    else if(squidId == 3 && place == 2)
    {
      return "../../assets/tile_humboldt_2.png"
    }
    else if(squidId == 3 && place == 3)
    {
      return "../../assets/tile_humboldt_3.png"
    }
    else if(squidId == 4 && place == 1)
    {
      return "../../assets/tile_giant_1.png"
    }
    else if(squidId == 4 && place == 2)
    {
      return "../../assets/tile_giant_2.png"
    }
    else if(squidId == 4 && place == 3)
    {
      return "../../assets/tile_giant_3.png"
    }
    else if(squidId == 4 && place == 4)
    {
      return "../../assets/tile_giant_4.png"
    }
    else if(squidId == 5 && place == 1)
    {
      return "../../assets/tile_kraken_1.png"
    }
    else if(squidId == 5 && place == 2)
    {
      return "../../assets/tile_kraken_2.png"
    }
    else if(squidId == 5 && place == 3)
    {
      return "../../assets/tile_kraken_3.png"
    }
    else if(squidId == 5 && place == 4)
    {
      return "../../assets/tile_kraken_4.png"
    }
    else if(squidId == 5 && place == 5)
    {
      return "../../assets/tile_kraken_5.png"
    }

    return "../../assets/tile_empty.png";
  }

  async placeSquid(x: number, y: number)
  {
    if(this.ready || this.squidSelect == -1)
    {
      return;
    }

    if(this.placedSquids[this.squidSelect-1])
    {
      alert("squid has already been placed!");
      return;
    }

    if(this.board == null)
    {
      console.log("board is null!");
      return;
    }

    let squidToPlace = await this.squidServ.getSquidById(this.squidSelect).toPromise();
    let realx: number = x-1;
    let realy: number = y-1;
    //placed squid from bottom up
    if(this.verticalPlacement)
    {
      if(realy < squidToPlace.size-1)
      {
        alert("not enough room!")
        return;
      }

      //ensure no squid conflicts
      for(let i = realy; i > realy-squidToPlace.size; i--)
      {
        if(this.board.tiles[realx][i].calamari.id != 6)
        {
          alert("a squid is already there!");
          return;
        }
      }

      //place squid
      for(let i = realy; i > realy-squidToPlace.size; i--)
      {
        this.board.tiles[realx][i].calamari = squidToPlace;
        console.log("trying to place");
        await this.tileServ.updateTile(this.board.tiles[realx][i]).toPromise();
        console.log("trying to notify");
        this.tileServ.sendTile(this.board.tiles[realx][i]);
      }

      //update image
      for(let i = realy, j = squidToPlace.size; i > realy-squidToPlace.size; i--, j--)
      {
        this.imagePaths[realx][i] = this.getAssetFromSquidId(squidToPlace.id,j);
      }

    }
    if(!this.verticalPlacement)
    {
      if(realx > 9 - squidToPlace.size+1)
      {
        alert("not enough room!")
        return;
      }

      for(let i = realx; i < realx + squidToPlace.size; i++)
      {
        if(this.board.tiles[i][realy].calamari.id != 6)
        {
          alert("a squid is already there!");
          return;
        }
      }

      //place squid
      for(let i = realx; i < realx + squidToPlace.size; i++)
      {
        this.board.tiles[i][realy].calamari = squidToPlace;
        await this.tileServ.updateTile(this.board.tiles[i][realy]).toPromise();
        this.tileServ.sendTile(this.board.tiles[i][realy]);
      }

      //update image
      for(let i = realx, j = squidToPlace.size; i < realx + squidToPlace.size; i++, j--)
      {
        this.imagePaths[i][realy] = this.getAssetFromSquidId(squidToPlace.id,j);
      }

    }

    this.placedSquids[this.squidSelect-1] = true;

    //check if all squids are placed
    for(let i = 0; i < this.placedSquids.length; i++)
    {
      if(!this.placedSquids[i])
      {
        return;
      }
    }

    this.ready = true;

  }

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

    console.log(this.board?.owner.id);
    if(this.board?.owner.id == this.personServ.getLoggedUser().id)
    {
      this.primary = true;
    }
    else{
      this.primary = false;
    }

    console.log(this.board);
  }

  async inkTile(x: number,y: number)
  {
    if (!this.ready)
    {
      return;
    }
    let tile: Tile;
    if (this.board)
    {
      console.log(this.board);
      tile = this.board.tiles[x-1][y-1];
      if (this.game.activePlayerId != this.personServ.getLoggedUser().id)
      {
        alert("not your turn!");
        return;
      }
      if(this.personServ.getLoggedUser().id == this.board.owner.id)
      {
        alert("cant fire on your own squids");
        return;
      }
      if (tile.status.id == 1)
      {
        tile.status = await this.tileStatServ.getTileStatusById(2).toPromise();
        this.imagePaths[x][y] +="_inked";
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
