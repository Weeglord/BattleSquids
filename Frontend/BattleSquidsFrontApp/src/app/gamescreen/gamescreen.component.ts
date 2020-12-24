import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { PersonService } from '../services/person.service';
import { Game } from '../models/game';
import { GamestatusService } from '../services/gamestatus.service';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {
  game : Game;
  invitedUsername: String = "";

  //firt create an empty game, 1 player no boards. Once an invite is accepted boards will be filled
  constructor(personServ: PersonService, gameServ: GameService, gameStatServ: GamestatusService) {
    this.game = window.sessionStorage.game;
   }

  ngOnInit(): void {
  }

  

}
