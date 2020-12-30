import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-matchhistory',
  templateUrl: './matchhistory.component.html',
  styleUrls: ['./matchhistory.component.css']
})
export class MatchhistoryComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  returnToPrevious(): void {
    this.location.back();
  }

}
