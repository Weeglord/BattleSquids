import { Injectable } from '@angular/core';
import { Chat } from './models/chat';
import { ChatService } from './services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  websocket: WebSocket | undefined;
  chatmessage: Chat | undefined;

  constructor(public chatservice: ChatService) { }

  public openWebSOcket(){
    this.websocket= new WebSocket('ws://localhost:8080/chat');

    this.websocket.onopen = (event) => {
      console.log('Open: ',event)
    };
    this.websocket.onmessage = (event) => {
      const message=JSON.parse(event.data);
      this.chatmessage.message=message;
    };

    this.websocket.close = (event) => {
      console.log('Close: ',event);
    }
  }
  isOpen(ws) { return ws.readyState === ws.OPEN; }

  public sendmessage(Chat:Chat){
    if(!this.isOpen(this.websocket)) return ;
  this.websocket.send(JSON.stringify(Chat));

    //this.websocket.send(JSON.stringify(Chat));
  }

  public closewebsocket(){

    this.websocket?.close();
  }

  public getmessagebygameid(){

  }

}
