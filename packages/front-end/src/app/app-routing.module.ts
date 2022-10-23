import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipComponent } from './components/championship/championship.component';
import { ChampionshipsComponent } from './components/championships/championships.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: 'championships', component: ChampionshipsComponent},
  {path: 'championship', component: ChampionshipComponent},

  /** Redirect Konfigurationen **/
  {path: '**', component: NotFoundComponent}, // immer als letztes konfigurieren - erste Route die matched wird angesteuert
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
