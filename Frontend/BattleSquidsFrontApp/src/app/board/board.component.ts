import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { Person } from '../models/person';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() player!: Person | null | undefined;
  @Input() board!: Board | null | undefined;

  sideArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
