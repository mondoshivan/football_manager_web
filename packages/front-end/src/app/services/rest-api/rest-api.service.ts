import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ChampionshipDTO, FilterDTO, FormationDTO, IncludesDTO, PlayerDTO, TeamDTO, UserDTO } from '@football-manager/data-transfer';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { apiConfig } from 'src/app/core/routeConfig';

export interface HTTPParams { 
  [param: string]: string | number | boolean | readonly (string | number | boolean)[]; 
};

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  retryAmount = 3;

  login(email: string, password: string) : Observable<string> {
    const url = `${apiConfig}/users/login`;
    const body = { username: email, password: password };
    return this.http.post<string>(url, body)
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  users(includes? : IncludesDTO) : Observable<UserDTO> {
    const url = apiConfig+ '/users';
    let httpParams = new HttpParams();
    if (includes) httpParams = httpParams.appendAll(includes);
    return this.http.get<UserDTO>(url, { params: httpParams })
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  championship(id : number, includes? : IncludesDTO) : Observable<ChampionshipDTO> {
    const url = apiConfig + '/championships/' + id.toString();
    let httpParams = new HttpParams();
    if (includes) httpParams = httpParams.appendAll(includes);
    return this.http.get<ChampionshipDTO>(url, { params: httpParams })
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  team(id : number, includes? : IncludesDTO) : Observable<TeamDTO> {
    const url = apiConfig + '/teams/' + id.toString();
    let httpParams = new HttpParams();
    if (includes) httpParams = httpParams.appendAll(includes);
    return this.http.get<TeamDTO>(url, { params: httpParams })
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  player(id : number, includes? : IncludesDTO) : Observable<PlayerDTO> {
    const url = apiConfig + '/players/' + id.toString();
    let httpParams = new HttpParams();
    if (includes) httpParams = httpParams.appendAll(includes);
    return this.http.get<PlayerDTO>(url, { params: httpParams })
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  championships(filters? : FilterDTO, includes? : IncludesDTO) : Observable<ChampionshipDTO[]> {
    const url = apiConfig + '/championships';
    let httpParams = new HttpParams();
    if (filters) httpParams = httpParams.appendAll(filters);
    if (includes) httpParams = httpParams.appendAll(includes);
    return this.http.get<ChampionshipDTO[]>(url, { params: httpParams })
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  formations(params? : FilterDTO, includes? : IncludesDTO) : Observable<FormationDTO[]> {
    const url = apiConfig + '/formations';
    let httpParams = new HttpParams();
    if (params) httpParams = httpParams.appendAll(params);
    if (includes) httpParams = httpParams.appendAll(includes);
    return this.http.get<FormationDTO[]>(url, { params: httpParams })
    .pipe(
      retry(this.retryAmount), // retry a failed request
      catchError(this.handleError)
    );
  }

  updateTeamFormation(teamId: number, formation: string) : Observable<TeamDTO> {
    const url = `${apiConfig}/teams/formation`;
    const body = { teamId: teamId, formation: formation };
    return this.http.post<TeamDTO>(url, body)
      .pipe(
        retry(this.retryAmount), // retry a failed request
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
