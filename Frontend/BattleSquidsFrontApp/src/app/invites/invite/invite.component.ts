import { Component, OnInit } from '@angular/core';
import { Invite } from '../../models/invite';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  constructor(private invite: Invite) { }

  ngOnInit(): void {
  }

}
