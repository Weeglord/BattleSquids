import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService implements OnDestroy {

  webSocket: WebSocketSubject<any>;

  constructor() { };

  public testSocket() {
    this.openWebSocket();
    this.sendMessage();
    this.onMessage();
  }

  public openWebSocket() {
    this.webSocket = webSocket('ws://echo.websocket.org');
  }    

  public onMessage() {
    if (this.webSocket) {
      console.log("Connected");
      this.webSocket.subscribe(
        msg => console.log('message received: ' + JSON.stringify(msg)),
        err => console.log(err),
        () => console.log('complete')
      );
    } else {
      console.error('Did not receive message, open a connection first');
    }
  }

  public sendMessage() {
    if (this.webSocket) {
      this.webSocket.subscribe();
      this.webSocket.next({message: 'Hello World'});
      console.log("Sent Hello World");
    } else {
      console.error('Did not send message, open a connection first');
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
