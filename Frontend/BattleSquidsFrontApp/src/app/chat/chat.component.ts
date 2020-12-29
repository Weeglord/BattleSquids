import { stringify } from '@angular/compiler/src/util';
import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Chat } from '../models/chat';
import { Game } from '../models/game';
import { Person } from '../models/person';
import { ChatService } from '../services/chat.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , OnDestroy{
message!: string;
@Input() person!:Person |null;
@Input() game!:Game;
chat!: Chat;
username!:string;
  constructor(private chatserv:ChatService , public webSocketService: WebSocketService) { }

  ngOnInit(): void {
   this.person=JSON.parse(window.sessionStorage.user);
   this.game=JSON.parse(window.sessionStorage.game);
   console.log(this.game.id+ this.person.username);
   this.webSocketService.openWebSocket();
   // this.webservice.
  }

  ngOnDestroy(){
    this.webSocketService.closewebsocket();
  }
  getmessage(){

  }

  // async sendingmessage(chat:Chat){
  //   const msg = new Chat(await this.chatserv.addChat(chat).toPromise(),this.game.id,this.person,this.message);
  //   this.webservice.sendmessage(msg);
  // }


 sendmessage(){
 this.chat=new Chat();
 this.chat.message=this.message;
this.username=this.person.username;
this.chat.sender=JSON.parse(window.sessionStorage.user);
//chat.gameId=63;
console.log(this.game.id);  
//let game=JSON.parse(window.sessionStorage.game);
this.chat.gameId=this.game.id;
  if(this.message && this.person){

    this.chatserv.addChat(this.chat).subscribe(
      resp => {
        if(resp){
          this.webSocketService.sendmessage(this.chat);
          this.message='';
        }else{
          console.log("error");
        }
      }
    )

  }
 }
}
