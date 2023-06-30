import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AppDTO, CalendarDTO, IncludesDTO } from '@football-manager/data-transfer';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

interface WeekDay {

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalandarComponent {

  @Input() calendarList!: CalendarDTO[];

  calendar = 'all';
  view = 'week';
  app?: AppDTO;
  weekDays: WeekDay[] = []

  constructor(private restApiService: RestApiService) { 
    this.getApp();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortCalendarsAlphabetical();
  }

  getApp() {
    const appId = 1;
    this.restApiService.app(appId).subscribe(
      (app) => {
        this.app = app;
    });
  }

  getWeekDays() {
    
  }

  sortCalendarsAlphabetical() {
    this.calendarList.sort((a,b) => {
      const textA = a.type.toUpperCase();
      const textB = b.type.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  onViewChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.view = target.value;

    if (this.view === 'week') {
      this.getWeekDays();
    }
  }
  
  onCalendarChange(value: string) {
    this.calendar = value;
  }
}
