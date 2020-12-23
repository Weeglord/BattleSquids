import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'
import { Person } from '../models/person'
import { PersonService } from '../services/person.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  @Output() logInEvent: EventEmitter<any> = new EventEmitter();
  loggedUser: Person | null | undefined;
  user!: string;
  pass!: string;
  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    this.user = '';
    this.pass = '';
    this.logIn();
  }

  ngOnChanges() {
    console.log(this.user + ' ' + this.pass);
  }
  logIn() {
    console.log(this.user + ' ' + this.pass);
    this.personService.loginUser(this.user, this.pass).subscribe(
      resp => {
        this.loggedUser = resp;
        this.logInEvent.emit();
      }
    );
  }

  logOut() {
    this.personService.logoutUser().subscribe(
      resp => {
        this.loggedUser = null;
        this.router.navigate(['home']);
      }
    );
  }

  register() {
  }
}
