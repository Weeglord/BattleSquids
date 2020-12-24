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
    this.game = new Game();
    this.game.player1 = window.sessionStorage.user;
    this.game.player2 = null;
    this.game.activePlayerId = this.game.player1.id;
    this.game.board1 = null;
    this.game.board2 = null;
    gameStatServ.getGameStatusById(1).subscribe(
      resp => {this.game.status = resp;
      gameServ.addGame(this.game)}
    );
    


   }

  ngOnInit(): void {
  }

  

}
