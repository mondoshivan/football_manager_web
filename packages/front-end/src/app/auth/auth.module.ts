import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { AuthInterceptor } from "./auth.interceptor";
import { AuthRoutingModule } from "./auth-routing.module";
import { ConfirmComponent } from './containers/confirm/confirm.component';
import { LoginComponent } from './containers/login/login.component';
import { LogoutComponent } from './containers/logout/logout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authStrategyProvider } from './services/auth.strategy';
import { RegisterComponent } from './containers/register/register.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    RegisterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    authStrategyProvider,
  ]
})

export class AuthModule { }
