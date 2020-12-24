import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invite } from '../../models/invite';
import { InviteService } from '../../services/invite.service';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {

  constructor(
    private inviteService: InviteService,
    private personService: PersonService,
    private pertainsToSent: boolean,
    private list: Observable<Invite[]>
  ) { }

  ngOnInit(): void {
    this.list = this.getInvites();
  }

  getInvites(): Observable<Invite[]> {
    let id: number = this.personService.getLoggedUser().id;
    return this.pertainsToSent ? 
      this.inviteService.getAllInvitesSentByUserWithId(id) : 
      this.inviteService.getAllInvitesReceivedByUserWithId(id);
  }
}
