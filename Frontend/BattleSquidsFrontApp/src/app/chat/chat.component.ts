import { stringify } from '@angular/compiler/src/util';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { Chat } from '../models/chat';
import { Game } from '../models/game';
import { Person } from '../models/person';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
message!: string;
@Input() person!:Person |null;
@Input() game!:Game;
  constructor(private chatserv:ChatService) { }

  ngOnInit(): void {
   //this.person=JSON.parse(window.sessionStorage.user);
   this.game=window.sessionStorage.game;
   console.log(this.game.id);
  
  }
 sendmessage(){
  let chat:Chat=new Chat();
  chat.message=this.message;

chat.sender=JSON.parse(window.sessionStorage.user);
//chat.gameId=63;
console.log(this.game.id);  
chat.gameId=this.game.id;

  if(this.message && this.person){

    this.chatserv.addChat(chat).subscribe(
      resp => {
        if(resp){
          this.message='';
        }else{
          console.log("error");
        }
      }
    )

  }
 }
}
