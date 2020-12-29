import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {
  game : Game;
  invitedUsername: string = "";


  //firt create an empty game, 1 player no boards. Once an invite is accepted boards will be filled
  constructor(private personServ: PersonService, private inviteServ: InviteService, private inviteStatusServ: InviteStatusService, private inviteTypeServ: InviteTypeService) {
    this.game = JSON.parse(window.sessionStorage.game);
   }

  ngOnInit(): void {
  }

  async sendInvite(): Promise<void>
  {
    let invitedPerson: Person | null = await this.personServ.getUserByUsername(this.invitedUsername).pipe(catchError(err => {console.log(err); return of(null)})).toPromise();
    console.log(invitedPerson);
    if (invitedPerson)
    {
      if (invitedPerson == this.personServ.getLoggedUser())
      {
        alert("You cannot invite yourself!");
      }
      else
      {
        let newInvite = new Invite();
        newInvite.sender = this.personServ.getLoggedUser();
        newInvite.game = JSON.parse(window.sessionStorage.game);
        //console.log(JSON.parse(window.sessionStorage.game));
        newInvite.receiver = invitedPerson;
        newInvite.status = await this.inviteStatusServ.getInviteStatusById(1).toPromise();
        newInvite.type = await this.inviteTypeServ.getInviteTypeById(1).toPromise();
        await this.inviteServ.addInvite(newInvite).toPromise();
        this.inviteServ.openInviteWebSocket(this.readInvite)
        alert("Invite Sent!");
      }
    }
    else{
      alert("No user " + this.invitedUsername + " found!");
    }
  }

  startGame()
  {

  }

  readInvite(str: string)
  {
    //if str accepted then startgame
    console.log(str);
  }
  

}
