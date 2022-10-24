import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.sass']
})
export class TeamMenuComponent implements OnInit {

  @Input() name: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
