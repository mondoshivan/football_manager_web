import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { ChampionshipDTO } from '@football-manager/data-transfer';
import { RestApiService } from "../../services/rest-api/rest-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-championships',
  templateUrl: './championships.component.html',
  styleUrls: ['./championships.component.sass']
})
export class ChampionshipsComponent implements AfterViewInit {

  championships : ChampionshipDTO[] = [];

  @ViewChild('table') table!: Ng2SmartTableComponent;
  tableDataSource: LocalDataSource;

  tableSettings : any = {
    mode: 'external',
    noDataMessage: '',
    pager: {
      display: false
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
    },
    columns: {
      name: {
        title: 'Name',
        filter: false
      },
      type: {
        title: 'Type',
        filter: false
      }
    },
    attr: {
      class: 'table table-bordered'
    }
  }

  constructor(private restApiService: RestApiService, private router: Router) {
    this.tableDataSource = new LocalDataSource();
    this.tableDataSource.reset(false);

    this.restApiService.championships().subscribe( async (championships: ChampionshipDTO[]) => {
      this.championships = championships;

      await Promise.all(championships.map(championship => {
        this.tableDataSource.add(championship);
      }));

      this.tableDataSource.refresh();
      this.table.grid.dataSet.deselectAll();
    });
  }

  ngAfterViewInit(): void {
    this.tableDataSource.onChanged().subscribe(async (change) => {
      this.table.grid.dataSet.deselectAll();
    });
  }

  onUserRowSelect(event: any) {
    this.router.navigateByUrl('/championship', { state: event.data });
  }

  onSelectRow(event: any) {

  }

  onMouseOver(event: any) {

  }

}