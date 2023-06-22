import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalandarComponent } from './calendar.component';

describe('CalandarComponent', () => {
  let component: CalandarComponent;
  let fixture: ComponentFixture<CalandarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalandarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
