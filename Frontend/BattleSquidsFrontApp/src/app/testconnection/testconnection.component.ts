import { Component, OnInit } from '@angular/core';
import { TileStatus } from '../models/tilestatus';
import {TilestatusService} from '../services/tilestatus.service';

@Component({
  selector: 'app-testconnection',
  templateUrl: './testconnection.component.html',
  styleUrls: ['./testconnection.component.css']
})
export class TestconnectionComponent implements OnInit {
  tile: any;


  constructor(private service: TilestatusService) {
    service.getTileStatusById(1).subscribe(resp => this.tile = resp);
   }

  ngOnInit(): void {
  }

}
