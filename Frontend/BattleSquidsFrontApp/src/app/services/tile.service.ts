import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Tile } from '../models/tile'

@Injectable({
  providedIn: 'root'
})
export class TileService implements OnDestroy {
  webSocket!: WebSocketSubject<any>;

  constructor() { };

  public openTileWebSocket() {
    this.webSocket = webSocket('ws://localhost:8080/BattleSquids/tile');
  }

  public onTileUpdate() {
    if (this.webSocket) {
      console.log("Tile updated");
      this.webSocket.subscribe(
        msg => console.log('message received: ' + JSON.stringify(msg)),
        err => console.log(err),
        () => console.log('complete')
      );
    } else {
      console.error('Did not receive anything; open a connection first');
    }
  }

  public sendTileUpdate() {
    if (this.webSocket) {
      this.webSocket.subscribe();
      this.webSocket.next({message: 'Updating tile'});
    } else {
      console.error('Did not send anything; open a connection first');
    }
  }

  public closeWebSocket() {
    if (this.webSocket) {
      this.webSocket.closed = true;
      this.webSocket.complete();
      this.webSocket.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.webSocket.complete();
    this.webSocket.closed = true;
  }
}
