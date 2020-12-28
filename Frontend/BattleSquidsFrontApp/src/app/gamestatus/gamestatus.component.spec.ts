import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestatusComponent } from './gamestatus.component';

describe('GamestatusComponent', () => {
  let component: GamestatusComponent;
  let fixture: ComponentFixture<GamestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamestatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
