import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ChampionshipComponent } from './components/championship/championship.component';
import { ChampionshipsComponent } from './components/championships/championships.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChampionshipMenuComponent } from './components/championship-menu/championship-menu.component';
import { TeamComponent } from './components/team/team.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamMenuComponent } from './components/team-menu/team-menu.component';
import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ChampionshipsComponent,
    ChampionshipComponent,
    NotFoundComponent,
    ChampionshipMenuComponent,
    TeamComponent,
    PlayerComponent,
    TeamMenuComponent,
    PlayerMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
