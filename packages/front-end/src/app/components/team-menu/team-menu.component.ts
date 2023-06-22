import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.sass']
})
export class TeamMenuComponent implements OnInit {

  @Input() name: any;

  selectedMenuItem = 'players';
  @Output() selected = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelection(selected: string) {
    this.selectedMenuItem = selected;
    this.selected.emit(selected);
  }

}
