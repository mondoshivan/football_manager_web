import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipComponent } from './components/championship/championship.component';
import { ChampionshipsComponent } from './components/championships/championships.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamComponent } from './components/team/team.component';
import { AccountComponent } from './components/account/account.component';
import { AppGuard } from './auth/guards/app.guard';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '', 
    component: IndexComponent
  },
  {
    path: 'championships', 
    component: ChampionshipsComponent,
    canActivate: [AppGuard]
  },
  { 
    path: 'championship/:id', 
    component: ChampionshipComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'team/:id', 
    component: TeamComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'player/:id', 
    component: PlayerComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'account', 
    component: AccountComponent,
    canActivate: [AppGuard]
  },

  /** Redirect Konfigurationen **/
  // needs to be at the bottem
  {
    path: '**', 
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
