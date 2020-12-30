import { ThisReceiver } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { Chat } from '../models/chat';
import { Game } from '../models/game';
import { GameStatus } from '../models/gamestatus';
import { MatchHistory } from '../models/matchhistory';
import { Person } from '../models/person';
import { ChatService } from '../services/chat.service';
import { GameService } from '../services/game.service';
import { MatchhistoryService } from '../services/matchhistory.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  message!: string;
  @Input() player!:Person ;
  @Input() game!:Game;
  @Input() invitedusername : string |null;
  loggedUser! : Person;
  matchhistory!: MatchHistory;
@Input() board:Board;
  chat!: Chat;
  username!:string | undefined;
  msg! : string;
  
  constructor(private chatservice:ChatService, private matchhistoryservice:MatchhistoryService, public webSocketService:WebSocketService,private gameservice:GameService) { }

  ngOnInit(): void {

    console.log(this.invitedUsername+"is invited opponents");
this.loggedUser=JSON.parse(window.sessionStorage.user);
//console.log(this.loggedUser.username+"is the logged user"+ this.player.username+" and I am");
   // this.person=JSON.parse(window.sessionStorage.user);
    this.game=JSON.parse(window.sessionStorage.game);
   // console.log(this.game.id+ this.person.username);
    this.webSocketService.openWebSocket();
    //this.username=this.player?.username;
  
 
  }
  ngOnDestroy(){
    this.webSocketService.closewebsocket();
  }

  getchat(){
    
  }

  leaveGame(){
    
    let gamestatus=this.game.status;
    gamestatus.id=2;

    this.game.status=gamestatus;
    this.gameservice.updateGame(this.game);
    this.matchhistory= new MatchHistory();
    this.matchhistory.id=this.game.id;
    console.log("logged use"+ this.loggedUser.username+" other player "+this.player.username);
    this.matchhistory.loser=this.loggedUser;
   // this.matchhistory.winner=;
   // this.matchhistory.begin=""
   console.log(this.matchhistory);
   this.matchhistoryservice.addMatchHistory(this.matchhistory).subscribe(
     resp =>{

      console.log("you loose");

     }
   );
    

    console.log("leaving");



  }

  sendmessage(){
    
    console.log("this board"+this.board?.owner.username);
    console.log("sender"+this.player?.username);
    this.chat=new Chat();
    this.chat.message=this.message;
   this.username=this.player.username;
   this.chat.sender=this.player;
   //chat.gameId=63;
   console.log(this.game.id);  
   //let game=JSON.parse(window.sessionStorage.game);
   this.chat.gameId=this.game.id;
     if(this.message && this.player){
   
       // this.chatserv.addChat(this.chat).subscribe(
       //   resp => {
       //     if(resp){
             this.webSocketService.sendmessage(this.chat);
             this.message='';
         //   }else{
         //     console.log("error");
         //   }
         // }
       
   
     }
   
   
  }

}
