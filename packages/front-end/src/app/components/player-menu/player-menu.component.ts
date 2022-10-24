import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.sass']
})
export class PlayerMenuComponent implements OnInit {

  @Input() firstName: any;
  @Input() secondName: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
