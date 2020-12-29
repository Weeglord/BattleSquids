import { Component, OnInit } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { Invite } from '../models/invite'
import { PersonService } from '../services/person.service';
import { InviteStatusService } from '../services/inviteStatus.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  invites!: Invite[];
  visible: Boolean = true;

  constructor(private inviteServ: InviteService, private personServ: PersonService, private invStatServ: InviteStatusService) {
    this.inviteServ.getAllInvitesReceivedByUserWithId(this.personServ.getLoggedUser().id).subscribe(resp => this.invites = resp)
   }

  ngOnInit(): void {
  }

  async acceptInvite(i: number)
  {
    this.invites[i].status = await this.invStatServ.getInviteStatusById(2).toPromise();
    await this.inviteServ.updateInvite(this.invites[i]).toPromise();
    this.visible = false;
  }
  
  async declineInvite(i: number)
  {
    console.log("declined" + i)
    this.invites[i].status = await this.invStatServ.getInviteStatusById(3).toPromise();
    console.log(this.invites[i]);
    await this.inviteServ.updateInvite(this.invites[i]).toPromise();
  }
}
