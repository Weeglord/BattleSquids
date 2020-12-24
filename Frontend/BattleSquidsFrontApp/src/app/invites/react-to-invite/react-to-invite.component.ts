import { Component, OnInit } from '@angular/core';
import { Invite } from '../models/invite';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-react-to-invite',
  templateUrl: './react-to-invite.component.html',
  styleUrls: ['./react-to-invite.component.css']
})
export class ReactToInviteComponent implements OnInit {

  constructor(
    private invite: Invite,
    private inviteService: InviteService,
    private selectedStatus: string
  ) { }

  ngOnInit(): void {}

  reactToInvite(): void {
    if(this.selectedStatus == "Accepted"){
      this.acceptInvite()
    }else if(this.selectedStatus == "Rejected"){
       this.rejectInvite();
    }else{
      alert("You screwed up.")
    }
  }

  rejectInvite(): void{
    this.invite.status = {
      id: 3,
      name: "Rejected"
    }
    this.inviteService.updateInvite(this.invite);
  }

  acceptInvite(): void{
    this.invite.status = {
      id: 2,
      name: "Accepted"
    }
    this.inviteService.updateInvite(this.invite);
  }
}
