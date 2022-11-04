import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { authConfig } from 'src/app/core/routeConfig';
import { LoginRequest } from 'src/app/models/login-request';
import { AuthStrategy, AUTH_STRATEGY } from './auth.strategy';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';
  public readonly INITIAL_PATH = '/account';

  loggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) {
    this.isLoggedIn$().subscribe((loggedIn) => {
      this.loggedIn = loggedIn
    });

    this.loggedInChange.subscribe((value) => {
      this.loggedIn = value
  });
  }

  register(user: User): Observable<void> {
    return this.http.post<any>(`${authConfig['authUrl']}/register`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.post<any>(`${authConfig['authUrl']}/confirm?`, {email, code});
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<any>(`${authConfig['authUrl']}/login`, loginRequest)
      .pipe(tap(data => this.doLoginUser(data)));
  }

  private doLoginUser(data: User) {
    this.auth.doLoginUser(data);
    this.setLoggedInState(true);
  }

  logout() {
    return this.http.get<any>(`${authConfig['authUrl']}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate([this.LOGIN_PATH]);
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User | undefined> {
    return this.auth.getCurrentUser();
  }

  private setLoggedInState(loggedIn: boolean) {
    this.loggedInChange.next(loggedIn);
}

  private doLogoutUser() {
    this.auth.doLogoutUser();
    this.setLoggedInState(false);
  }

}