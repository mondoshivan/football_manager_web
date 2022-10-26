import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { FormationDTO, IncludesDTO, PlayerDTO, TeamDTO } from '@football-manager/data-transfer';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import Utils from '@football-manager/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements AfterViewInit, OnInit, OnDestroy {

  team?: TeamDTO;
  formations?: FormationDTO[];

  routeSubscription? : Subscription;

  @ViewChild('table') table!: Ng2SmartTableComponent;
  tableDataSource: LocalDataSource;

  tableSettings: any = {
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
      age: {
        title: 'Alter',
        filter: false,
      },
      height: {
        title: 'Größe',
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

  ngOnInit(): void {
    this.getFormations();
    this.getTeam();
  }

  async ngAfterViewInit() {
    this.tableDataSource.onChanged().subscribe(async (change) => {
      this.table.grid.dataSet.deselectAll();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  getTeam() {
    // get the url parameters
    this.routeSubscription = this.route.params.subscribe(params => {

      // get the data via id
      const includes : IncludesDTO = { includeAll: true};
      this.restApiService.team(params['id'], includes).subscribe(

        // success response
        async (team) => {
          this.team = team;
          await this.loadTable(team);
        },

        // error response
        (error) => {
          console.error(error);
        }
      );
    });
  }

  getFormations() {
    this.restApiService.formations().subscribe(async (formations: FormationDTO[]) => {
      this.formations = formations;
    });
  }

  updateFormation(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;

    this.restApiService.updateTeamFormation(this.team!.id, button.innerHTML).subscribe(
      (team: TeamDTO) => {
        this.team = team;
      }
    );
  }

  convertPlayerForTable(player: PlayerDTO): any {
    const result = player as any;
    result.name = player.firstName + ' ' + player.secondName;
    result.age = Utils.ageBetweenDates(new Date(player.birthday), new Date(Date.now()));
    return result;
  }

  async loadTable(team: TeamDTO) {
    if (!team.Players) return;

    await Promise.all(team.Players.map(player => {
      this.tableDataSource.add(this.convertPlayerForTable(player));
    }));

    this.tableDataSource.refresh();
    this.table.grid.dataSet.deselectAll();
  }

  onUserRowSelect(event: any) {
    const player = event.data as PlayerDTO;
    this.router.navigate(['/player', player.id]);
  }

  onSelectRow(event: any) {

  }

  onMouseOver(event: any) {

  }
}
