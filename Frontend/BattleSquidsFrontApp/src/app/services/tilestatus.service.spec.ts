import { TestBed } from '@angular/core/testing';

import { TilestatusService } from './tilestatus.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../app.component';
import { TileStatus } from '../models/tilestatus';


describe('TilestatusService', () => {
  let service: TilestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    service = TestBed.inject(TilestatusService);
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /*
  it("can add a status", () => {
    let result;
    let status: TileStatus = new TileStatus();
    status.name = "a status";
    service.addTileStatus(status);

    expect(result).toBeTruthy();


  });

  it('should get a status', async () => {
    let result = service.getTileStatusById(1).subscribe((resp: any) => {
      result = resp;
    });
    expect(result).toBeTruthy();
    console.log(result);
  });
  */
});
