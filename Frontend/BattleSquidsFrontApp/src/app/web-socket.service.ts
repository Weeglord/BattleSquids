import { Injectable } from '@angular/core';
import { Chat } from './models/chat';
import { ChatService } from './services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  websocket!: WebSocket;
  chat: Chat[] = [] ;
  msg! : string;

  constructor(public chatservice: ChatService) { }

  public openWebSocket(){
    this.websocket= new WebSocket('ws://localhost:8080/BattleSquids/chataction');

    this.websocket.onopen = (event) => {
      console.log('Open: ',event)
    };
    this.websocket.onmessage = (event) => {
      const message=JSON.parse(event.data);
      //this.chatmessage?.splice(0,0,message);
      console.log("message "+message.id);
      this.chat=message.message;
      this.msg=message.message;
    };

    this.websocket.close = (event) => {
      console.log('Close: ',event);
    }
  }
  isOpen(ws: WebSocket) { return ws.readyState === ws.OPEN; }

  public sendmessage(Chat:Chat){
    //if(!this.isOpen(this.websocket)) return ;
  this.websocket.send(JSON.stringify(Chat));

    //this.websocket.send(JSON.stringify(Chat));
  }

  public closewebsocket(){

    this.websocket?.close();
  }

  public getmessagebygameid(){

  }


}
