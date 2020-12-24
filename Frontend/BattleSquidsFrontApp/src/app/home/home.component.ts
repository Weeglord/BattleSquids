import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(personServ: PersonService) { }

  ngOnInit(): void {
  }

}
