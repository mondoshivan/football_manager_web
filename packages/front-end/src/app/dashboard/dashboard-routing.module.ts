import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppGuard } from "../auth/guards/app.guard";
import { DashboadPageComponent } from "./containers/dashboad-page/dashboad-page.component";

const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboadPageComponent,
        canActivate: [AppGuard]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}