import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-championship-menu',
  templateUrl: './championship-menu.component.html',
  styleUrls: ['./championship-menu.component.sass']
})
export class ChampionshipMenuComponent implements OnInit {

  @Input() name: any;

  constructor() { }

  ngOnInit(): void {
  }

}
