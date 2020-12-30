import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { PersonService } from '../services/person.service';
import { Game } from '../models/game';
import { GamestatusService } from '../services/gamestatus.service';
import { Person } from '../models/person'
import { Invite } from '../models/invite'
import { InviteService } from '../services/invite.service';
import { InviteStatusService } from '../services/inviteStatus.service';
import { InviteTypeService } from '../services/inviteType.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Board } from '../models/board'
import { MatchhistoryService } from '../services/matchhistory.service';
import { MatchHistory } from '../models/matchhistory';

import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {
  game! : Game;
  invitedUsername: string = "";
  invite: Invite | null = null;
  invited = false;
  started = false;
  board1: Board;
  board2: Board;
  left = false;
  visibility: string = "visibility : visible";
  invitedPerson! : Person;
  parentcomponent!: AppComponent;


  //firt create an empty game, 1 player no boards. Once an invite is accepted boards will be filled
  constructor(private personServ: PersonService, private inviteServ: InviteService, private inviteStatusServ: InviteStatusService, private inviteTypeServ: InviteTypeService,private gameservice:GameService, private matchhistoryservice:MatchhistoryService,private router: Router) {
    this.fillGame();
    this.board1 = new Board();
    this.board2 = new Board();
   }

  ngOnInit(): void {
  }

  async fillGame()
  {
    if(window.sessionStorage.getItem("game") != null)
    {
      let json = window.sessionStorage.getItem("game");
      json = this.remove_non_ascii(json as string) as string;
      this.game = await JSON.parse(json);
      if(this.game?.player2)
      {
        this.invited = true;
        this.started = true;
      }
    }
    else{
      console.log("moved too fast, taking a second to retry");
      setTimeout(() => {
        this.fillGame();
      }, 2000);
    }
  }


 async leaveGame(){
    let loggedUser= JSON.parse(window.sessionStorage.user);
    let gamestatus=this.game.status;
    gamestatus.id=2;
    let matchhistory: MatchHistory;
    this.game.status=gamestatus;
    this.gameservice.updateGame(this.game);
    matchhistory= new MatchHistory();
    matchhistory.id=this.game.id;
    //console.log("logged use"+ loggedUser.username+" other player "+this.player.username);
    matchhistory.loser=loggedUser;
    let invitedPerson: Person = await this.personServ.getUserByUsername(this.invitedUsername).pipe(catchError(err => {console.log(err); return of(null)})).toPromise() as Person;
    console.log(invitedPerson+"is the invite on");
    matchhistory.winner=invitedPerson;//this.personServ.getUserByUsername(loggedUser.username).subscribe();
   // this.matchhistory.begin=""
   console.log(matchhistory);
   this.matchhistoryservice.addMatchHistory(matchhistory).subscribe(
     resp =>{

      console.log("you loose");
      
     }
   );
    // this.left= ;
    // / this.parentcomponent.remove();
   //  this.router.navigate['app'];
    console.log("leaving");
     this.visibility= "display: none";
     window.sessionStorage.removeItem("game");


  }




  remove_non_ascii(str: string) {
  
    if ((str===null) || (str===''))
         return false;
   else
     str = str.toString();
    
    return str.replace(/[^\x20-\x7E]/g, '');
  }

  async sendInvite(): Promise<void>
  {

    this.invitedPerson = await this.personServ.getUserByUsername(this.invitedUsername).pipe(catchError(err => {console.log(err); return of(null)})).toPromise() as Person;
    //console.log(invitedPerson);
    if (this.invitedPerson)
    {
      if (this.invitedPerson == this.personServ.getLoggedUser())
      {
        alert("You cannot invite yourself!");
      }
      else
      {
        let newInvite = new Invite();
        newInvite.sender = this.personServ.getLoggedUser();
        newInvite.game = JSON.parse(window.sessionStorage.game);
        //console.log(JSON.parse(window.sessionStorage.game));
        newInvite.receiver = this.invitedPerson;
        newInvite.status = await this.inviteStatusServ.getInviteStatusById(1).toPromise();
        newInvite.type = await this.inviteTypeServ.getInviteTypeById(1).toPromise();
        newInvite.id = await this.inviteServ.addInvite(newInvite).toPromise();
        this.inviteServ.openInviteWebSocket(this.personServ.getLoggedUser().id, this)
        alert("Invite Sent!");
        this.invited = true;
        this.invite = newInvite;
      }
    }
    else{
      alert("No user " + this.invitedUsername + " found!");
    }
  }

  async cancelInvite()
  {
    if (this.invite != null)
    {
      await this.inviteServ.deleteInvite(this.invite.id).toPromise();
    }
    this.invite = null;
    this.invited = false;
    this.inviteServ.closeInviteWebSocket();
  }

  startGame()
  {
    this.started = true;
  }

  readInvite(str: string)
  {
    if(str == "accepted")
    {
      if(this.game != null && this.invite != null)
      {
        this.game.player2 = this.invite.receiver;
        alert("Invite Accepted!");
        this.inviteServ.closeInviteWebSocket();
        this.startGame();
      }
    }
    else if(str == "rejected")
    {
      alert("Invite Declined! Please invite someone else!")
      this.cancelInvite();
    }
    console.log(str);
  }
  

}