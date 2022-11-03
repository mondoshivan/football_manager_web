import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";
import { ConfirmComponent } from "./containers/confirm/confirm.component";
import { LoginComponent } from './containers/login/login.component';
import { LogoutComponent } from "./containers/logout/logout.component";
import { AppGuard } from "./guards/app.guard";
import { RegisterComponent } from "./containers/register/register.component";

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout', 
    component: LogoutComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'confirm', 
    component: ConfirmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}