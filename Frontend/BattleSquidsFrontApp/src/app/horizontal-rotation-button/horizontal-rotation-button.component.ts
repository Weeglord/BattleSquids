import { Component, Input, OnInit } from '@angular/core';
import { Squid } from '../models/squid';

@Component({
  selector: 'app-horizontal-rotation-button',
  templateUrl: './horizontal-rotation-button.component.html',
  styleUrls: ['./horizontal-rotation-button.component.css']
})
export class HorizontalRotationButtonComponent implements OnInit {
  @Input() selectedSquid: Squid | null | undefined;
  @Input() isClockwise: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  rotateSquidHorizontally(){

  }
}
