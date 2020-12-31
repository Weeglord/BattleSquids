import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatComponent } from '../chat/chat.component';
import { Chat } from '../models/chat';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  webSocket!: WebSocket;
  url : string;
  chat: Chat[]=[];
  
  constructor(private http: HttpClient, private urlService: UrlService) {
    this.url = urlService.getUrl() + "/chat";
   }


   getAllChat(): Observable<Chat[]>
   {
    return this.http.get(this.url).pipe(map(resp => resp as Chat[]));
   }

   addChat(chat: Chat):  Observable<number>
   {
     return this.http.post(this.url, chat).pipe(map(resp => resp as number));
   }

   getChatById(id: number): Observable<Chat>
   {
     return this.http.get(this.url + "/" + id).pipe(map(resp => resp as Chat));
   }

   updateChat(chat: Chat): Observable<object>
   {
     return this.http.put(this.url, chat).pipe();
   }

   deleteChat(id: number): Observable<object>
   {
     return this.http.delete(this.url + "/" + id).pipe();
   }

  //  public openChatWebSocket(chat:ChatComponent,personId:number){
  //    this.webSocket= new WebSocket('ws://localhost:8080/BattleSquids/chataction?persid='+personId);
    
  //    this.webSocket.onopen = (event) =>{
  //      console.log('Open:',event);

  //    }

  //    this.webSocket.onmessage = (event) => {
  //     const message=JSON.parse(event.data);
  //     //this.chatmessage?.splice(0,0,message);
  //     console.log("message "+message.id);
  //     this.chat.splice(0,1,message);
  //    // this.chat.push(message);
  //     console.log(this.chat);
  //     //msg=message.message;
  //    }
   
   
   
  //   }

   
}
