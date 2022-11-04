import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { authConfig } from "src/app/core/routeConfig";
import { AuthStrategy } from "./auth.strategy";
import { User } from "../../models/user";

export class SessionAuthStrategy implements AuthStrategy<User> {

    private loggedUser?: User;
  
    constructor(private http: HttpClient) {}
  
    doLoginUser(user: User): void {
      this.loggedUser = user;
    }
  
    doLogoutUser(): void {
      this.loggedUser = undefined;
    }
  
    getCurrentUser(): Observable<User> {
      if (this.loggedUser) {
        return of(this.loggedUser);
      } else {
        return this.http.get<User>(`${authConfig["authUrl"]}/user`)
          .pipe(tap(user => this.loggedUser = user));
      }
    }
  }