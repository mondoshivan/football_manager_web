import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipMenuComponent } from './championship-menu.component';

describe('ChampionshipMenuComponent', () => {
  let component: ChampionshipMenuComponent;
  let fixture: ComponentFixture<ChampionshipMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionshipMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
