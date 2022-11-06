import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboadPageComponent } from './containers/dashboad-page/dashboad-page.component';

@NgModule({
  declarations: [
    DashboadPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
