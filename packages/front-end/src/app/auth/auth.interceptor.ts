import { Injectable, Inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";

import { authConfig } from "../core/routeConfig";
import { AuthService } from "./services/auth.service";
import { JwtAuthStrategy } from "./services/jwt-auth.strategy";
import { AUTH_STRATEGY } from "./services/auth.strategy";
import { LogService } from "../services/log/log.service";
import { AuthResponseDTO } from "@football-manager/data-transfer"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private log: LogService,
    @Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwt.getAccessToken();
    if (authConfig.auth === "token" && this.jwt && token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const authRes = error.error as AuthResponseDTO;
          if (authRes.logout) {
            if (this.authService.loggedIn) {
              this.authService.doLogoutAndRedirectToLogin();
            }
          } else {
            return this.handle401Error(request, next);
          }
        }
        return throwError(() => { return error });
      })
    );
  }

  // try to refresh the tokens
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.log.debug('401 Error');
    if (!this.isRefreshing) {
      this.log.debug('Need to refresh');
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((tokens: any) => {
          this.log.debug('New set of tokens received');
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens);
          return next.handle(this.addToken(request, tokens.accessToken));
        })
      );
    } else {
      this.log.debug('Refreshing is already in progress');
      return this.refreshTokenSubject.pipe(
        filter(tokens => tokens != null),
        take(1),
        switchMap(tokens => {
          this.log.debug("waiting done");
          return next.handle(this.addToken(request, tokens.accessToken));
        })
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}