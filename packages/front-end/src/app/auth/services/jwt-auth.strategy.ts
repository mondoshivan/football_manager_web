import { Observable, of } from "rxjs";
import { TokenDTO } from '@football-manager/data-transfer'
import { AuthStrategy } from "./auth.strategy";
import { User } from "../../models/user";

export class JwtAuthStrategy implements AuthStrategy<TokenDTO> {

  private readonly JWT_ACCESS_TOKEN = 'JWT_ACCESS_TOKEN';
  private readonly JWT_REFRESH_TOKEN = 'JWT_REFRESH_TOKEN';

  doLoginUser(tokens: TokenDTO): void {
    localStorage.setItem(this.JWT_ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.JWT_REFRESH_TOKEN, tokens.refreshToken);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.JWT_ACCESS_TOKEN);
    localStorage.removeItem(this.JWT_REFRESH_TOKEN);
  }

  getCurrentUser(): Observable<User | undefined> {
    const token = this.getAccessToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }

  getAccessToken() {
    return localStorage.getItem(this.JWT_ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.JWT_REFRESH_TOKEN);
  }

  getRefreshData(): TokenDTO | undefined {
    const access = this.getAccessToken();
    const refresh = this.getRefreshToken();

    if (access && refresh) {
      return {
        accessToken: access,
        refreshToken: refresh
      }
    }

    return;
  }
}