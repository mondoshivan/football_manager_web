import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { FormationDTO, PlayerDTO, TeamDTO } from '@football-manager/data-transfer';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements AfterViewInit {

  team? : TeamDTO;
  formations? : FormationDTO[];

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
      age: {
        title: 'Alter',
        filter: false,
        valuePrepareFunction: (date: string) => {
          return this.ageFromDate(date);
        }
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

  constructor(private restApiService: RestApiService, private router: Router) { 
    this.tableDataSource = new LocalDataSource();
    this.tableDataSource.reset(false);

    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state) {
      this.team = nav.extras.state as TeamDTO;
    }

    this.restApiService.formations().subscribe( async (formations: FormationDTO[]) => {
      this.formations = formations;
    });
  }

  async ngAfterViewInit() {
    this.tableDataSource.onChanged().subscribe(async (change) => {
      this.table.grid.dataSet.deselectAll();
    });

    if (this.team) {
      await this.loadTable(this.team);
    }
  }

  convertPlayerForTable(player: PlayerDTO) : any {
    const result = player as any;
    result.name = player.firstName + ' ' + player.secondName;
    return result;
  }

  async loadTable(team: TeamDTO) {

    await Promise.all(team.Players.map(player => {
      this.tableDataSource.add(this.convertPlayerForTable(player));
    }));

    this.tableDataSource.refresh();
    this.table.grid.dataSet.deselectAll();
  }

  ageFromDate(date: string) : number {
    // return new Date(date);
    return 22;
  }

  onUserRowSelect(event: any) {
    this.router.navigateByUrl('/player', { state: event.data });
  }

  onSelectRow(event: any) {

  }

  onMouseOver(event: any) {

  }

  changeFormation(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;

    this.restApiService.updateTeamFormation(this.team!.id, button.innerHTML).subscribe(async (team: TeamDTO) => {
      // this.formations!.find(f => f.id === team.Formation.id);
      this.team = team;
      console.log(this.team);
    });
  }

}
