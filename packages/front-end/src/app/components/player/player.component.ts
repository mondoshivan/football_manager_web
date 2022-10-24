import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { PlayerDTO, TeamDTO } from '@football-manager/data-transfer';
import Utils from '@football-manager/utils';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements AfterViewInit {

  player? : PlayerDTO;

  constructor(private router: Router) { 
    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state) {
      this.player = nav.extras.state as PlayerDTO;
    }
  }

  async ngAfterViewInit() {

  }

  playerAge() : number {
    if (! this.player) return 0;
    return Utils.ageBetweenDates(new Date(this.player!.birthday), new Date(Date.now()));
  }

}
