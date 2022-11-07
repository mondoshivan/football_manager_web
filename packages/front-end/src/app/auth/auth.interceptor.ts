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
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.log.log('401 Error');
    if (!this.isRefreshing) {
      this.log.log('Need to refresh');
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((tokens: any) => {
          this.log.log('New set of tokens received');
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens);
          return next.handle(this.addToken(request, tokens.accessToken));
        }));
    } else {
      this.log.log('Refreshing is already in progress');
      return this.refreshTokenSubject.pipe(
        filter(tokens => tokens != null),
        take(1),
        switchMap(tokens => {
          this.log.log("waiting done");
          return next.handle(this.addToken(request, tokens.accessToken));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}