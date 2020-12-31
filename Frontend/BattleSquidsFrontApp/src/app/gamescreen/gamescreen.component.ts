
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { of, Subject, throwError } from 'rxjs';
import { Board } from '../models/board';
import { Tile } from '../models/tile';
import { BoardService } from '../services/board.service';
import { TilestatusService } from '../services/tilestatus.service';
import { SquidService } from '../services/squid.service';
import { ThrowStmt } from '@angular/compiler';
import { BoardComponent } from '../board/board.component';
import { ClientService } from '../services/client.service';
import { MatchhistoryService } from '../services/matchhistory.service';
import { MatchHistory } from '../models/matchhistory';

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
  invitespectator : string="";
  spectator!: Person;
  
  initEvent: Subject<void> = new Subject<void>();
  @ViewChild('boardcomp1') boardComponent1!: BoardComponent;
  @ViewChild('boardcomp2') boardComponent2!: BoardComponent;
 
  //firt create an empty game, 1 player no boards. Once an invite is accepted boards will be filled
  constructor(private clientServ: ClientService, private personServ: PersonService,private matchhistoryservice: MatchhistoryService, private inviteServ: InviteService, private inviteStatusServ: InviteStatusService, private inviteTypeServ: InviteTypeService, private boardserv: BoardService, private tilseStatServ: TilestatusService, private squidServ: SquidService, private gameServ: GameService) {

    this.fillGame();
    this.board1 = new Board();
    this.board2 = new Board();
   }

  ngOnInit(): void {
  }
async invitefriend():Promise<void>
{

  this.spectator = await this.personServ.getUserByUsername(this.invitespectator).pipe(catchError(err => {console.log(err); return of(null)})).toPromise() as Person;
  console.log(this.spectator);
  if (this.spectator)
  {
    if (this.spectator == this.personServ.getLoggedUser())
   {
      alert("You cannot invite yourself!");
    }
    else
    {
      let newInvite = new Invite();
      newInvite.sender = this.personServ.getLoggedUser();
      newInvite.game = JSON.parse(window.sessionStorage.game);

      newInvite.receiver = this.spectator;
     newInvite.status = await this.inviteStatusServ.getInviteStatusById(1).toPromise();
      newInvite.type = await this.inviteTypeServ.getInviteTypeById(2).toPromise();
      newInvite.id = await this.inviteServ.addInvite(newInvite).toPromise();
      this.inviteServ.openInviteWebSocket(this.personServ.getLoggedUser().id, this)
      alert("Invite Sent!");
      //this.invited = true;
      //this.invite = newInvite;
    }
  }
  else{
    alert("No user " + this.invitedUsername + " found!");
  }
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
        this.clientServ.openClientWebsocket(this, this.personServ.getLoggedUser().id);
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
    this.gameServ.updateGame(this.game);
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



  async onMessage(message: string)
  {
    console.log(message);
    if(message == "loading done")
    {
      this.game = await this.gameServ.getGameById(this.game.id).toPromise();
      this.startGame();
      this.clientServ.closeClientWebSocket();
    }
  }

  async createBoards()
  {
    if(this.game.player2 != null)
    {
      this.board1.owner = this.game.player1;
      this.board2.owner = this.game.player2;

      this.board1.gameId = this.game.id;
      this.board2.gameId = this.game.id;
      let arr1 = new Array<Array<Tile>>(10);
      let arr2 = new Array<Array<Tile>>(10);

      for(let i = 0; i < 10; i++)
      {
        arr1[i] = new Array<Tile>(10);
        arr2[i] = new Array<Tile>(10);
      }

      let emptySquid = await this.squidServ.getSquidById(6).toPromise();
      let hiddenTileStatus = await this.tilseStatServ.getTileStatusById(1).toPromise();

      for(let i = 0; i < 10; i++)
      {
        for(let j = 0; j < 10; j++)
        {
          let tileToAdd = new Tile();
          tileToAdd.calamari = emptySquid;
          tileToAdd.status = hiddenTileStatus
          tileToAdd.x = i;
          tileToAdd.y = j;
          arr1[i][j] = tileToAdd;
          arr2[i][j] = tileToAdd;
        }
      }
      this.board1.tiles = arr1;
      this.board2.tiles = arr2;

      await this.boardserv.addBoard(this.board1).toPromise();
      await this.boardserv.addBoard(this.board2).toPromise();

      this.game = await this.gameServ.getGameById(this.game.id).toPromise();
      this.board1 = this.game.board1 as Board;
      this.board2 = this.game.board2 as Board;
      window.sessionStorage.setItem("game", JSON.stringify(this.game));
      //console.log("game stored in session");
      //console.log(window.sessionStorage.getItem("game"));
    }
    this.startGame();
    this.clientServ.sendMessage("loading done=" + this.game.player2?.id);
    setTimeout(() => {
      this.boardComponent1.initBoard(true);
      this.boardComponent2.initBoard(false);
      
    }, 2000);
    //this.updateBoards();

    
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
    console.log("accepted ");
    {
      if(this.game != null && this.invite != null)
      {
        console.log(this.invite.type.name+" is the invite type"+ this.invite.type.name==="Spectator");
        if(!(this.invite.type.name==="Spectator")){
        this.game.player2 = this.invite.receiver;
        alert("Invite Accepted!");
        this.inviteServ.closeInviteWebSocket();

        this.startGame();

        this.clientServ.openClientWebsocket(this, this.personServ.getLoggedUser().id);
        this.createBoards();
        //this.startGame();
      }else{
       // this.startGame();
        console.log("spectator")
     
      }
    
    }
    else if(str == "rejected")
    {
      alert("Invite Declined! Please invite someone else!")
      this.cancelInvite();
    }
    console.log(str);
  }
  

}}  