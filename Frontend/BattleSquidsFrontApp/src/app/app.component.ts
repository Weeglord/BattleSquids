import { Component } from '@angular/core';
import { Person } from './models/person';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BattleSquidsFrontApp';
  personServ: PersonService;
  person: Person | null;
  constructor(personServ: PersonService) {
    this.personServ = personServ;
    this.person = null;
  }

  setLogin() {
    this.person = window.sessionStorage.user;
  }

  setLogout() 
  {
    this.person = null;
  }
}
