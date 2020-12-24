import { Injectable, OnDestroy } from '@angular/core';
import { Tile } from '../models/tile';

@Injectable({
  providedIn: 'root'
})
export class TileService implements OnDestroy {
  webSocket!: WebSocket;
  tile!: Tile;

  constructor() { };
 
  public openTileWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/BattleSquids/tileaction');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const tile = JSON.parse(event.data);
      console.log(tile);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendTile(tile: Tile) {
    this.webSocket.send(JSON.stringify(tile));
  }

  public closeTileWebSocket() {
    this.webSocket.close()
  }

  public ngOnDestroy() {
    this.webSocket.close();
  }
}
