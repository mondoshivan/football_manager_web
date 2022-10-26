import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { ChampionshipDTO, FilterDTO, IncludesDTO, TeamDTO } from '@football-manager/data-transfer';
import { RestApiService } from "../../services/rest-api/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.sass']
})
export class ChampionshipComponent implements OnInit, OnDestroy, AfterViewInit {

  championship? : ChampionshipDTO;

  routeSubscription? : Subscription;

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

  constructor(
    private restApiService: RestApiService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tableDataSource = new LocalDataSource();
    this.tableDataSource.reset(false);
  }

  async ngOnInit() {
    this.getChampionship();
  }

  ngAfterViewInit(): void {
    this.tableDataSource.onChanged().subscribe(async (change) => {
      this.table.grid.dataSet.deselectAll();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  getChampionship() {

    // get the url parameters
    this.routeSubscription = this.route.params.subscribe(params => {

      // get the data via id
      const includes : IncludesDTO = { includeByName: 'Team' };
      this.restApiService.championship(params['id'], includes).subscribe(

        // success response
        async (championship) => {
          this.championship = championship;
          await this.loadTable(this.championship);
        },

        // error response
        (error) => {
          console.error(error);
        }
      );
    });
  }

  async loadTable(championship: ChampionshipDTO) {
    if (!championship.Teams) return; 

    await Promise.all(championship.Teams.map(team => {
      this.tableDataSource.add(team);
    }));

    this.tableDataSource.refresh();
    this.table.grid.dataSet.deselectAll();
  }

  onUserRowSelect(event: any) {
    const team = event.data as TeamDTO;
    this.router.navigate(['/team', team.id]);
  }

  onSelectRow(event: any) {

  }

  onMouseOver(event: any) {

  }

}