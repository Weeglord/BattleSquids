import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalRotationButtonComponent } from './horizontal-rotation-button.component';

describe('HorizontalRotationButtonComponent', () => {
  let component: HorizontalRotationButtonComponent;
  let fixture: ComponentFixture<HorizontalRotationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalRotationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalRotationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
