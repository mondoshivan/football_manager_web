import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechenschieberComponent } from './rechenschieber.component';

describe('RechenschieberComponent', () => {
  let component: RechenschieberComponent;
  let fixture: ComponentFixture<RechenschieberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechenschieberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechenschieberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
