import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title: string = "Football Manager"

  constructor(private log: LogService) {
    this.log.log('loading app');
  }

}