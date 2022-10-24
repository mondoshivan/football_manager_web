import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { ChampionshipDTO } from '@football-manager/data-transfer';
import { RestApiService } from "../../services/rest-api/rest-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.sass']
})
export class ChampionshipComponent implements AfterViewInit {

  championship? : ChampionshipDTO;

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
        title: 'Team',
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

    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state) {
      this.championship = nav.extras.state as ChampionshipDTO;
    }
  }

  async loadTable(championship: ChampionshipDTO) {

    await Promise.all(championship.Teams.map(team => {
      this.tableDataSource.add(team);
    }));

    this.tableDataSource.refresh();
    this.table.grid.dataSet.deselectAll();
  }

  async ngAfterViewInit() {
    this.tableDataSource.onChanged().subscribe(async (change) => {
      this.table.grid.dataSet.deselectAll();
    });

    if (this.championship) {
      await this.loadTable(this.championship);
    }
  }

  onUserRowSelect(event: any) {
    this.router.navigateByUrl('/team', { state: event.data });
  }

  onSelectRow(event: any) {

  }

  onMouseOver(event: any) {

  }

}