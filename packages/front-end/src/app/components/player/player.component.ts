import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncludesDTO, PlayerDTO, TeamDTO } from '@football-manager/data-transfer';
import Utils from '@football-manager/utils';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit, OnDestroy {

  player? : PlayerDTO;

  routeSubscription? : Subscription;

  constructor(
    private restApiService: RestApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPlayer();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  getPlayer() {
    // get the url parameters
    this.routeSubscription = this.route.params.subscribe(params => {

      // get the data via id
      const includes : IncludesDTO = { includeByName: 'Skill'};
      this.restApiService.player(params['id'], includes).subscribe(

        // success response
        async (player) => {
          this.player = player;
        },

        // error response
        (error) => {
          console.error(error);
        }
      );
    });
  }

  avg(type : string) : number{
    const skills = this.player?.Skills?.filter(skill => skill.type === type);
    if (!skills) return 0;
    const total = skills.map(skill => skill.PlayerSkill!.value).reduce((a, b) => a + b, 0);
    return skills && total ? (total / skills.length) : 0;
  }

  progressWidth(value: number) : object {
    return {'width' : `${value}%`};
  }

  playerAge() : number {
    if (! this.player) return 0;
    return Utils.ageBetweenDates(new Date(this.player!.birthday), new Date(Date.now()));
  }

}
