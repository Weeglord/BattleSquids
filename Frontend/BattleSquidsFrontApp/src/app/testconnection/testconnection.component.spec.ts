import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestconnectionComponent } from './testconnection.component';

describe('TestconnectionComponent', () => {
  let component: TestconnectionComponent;
  let fixture: ComponentFixture<TestconnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestconnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestconnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
