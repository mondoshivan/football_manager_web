import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ChampionshipsComponent,
    ChampionshipComponent,
    NotFoundComponent,
    ChampionshipMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
