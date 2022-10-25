import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChampionshipDTO, FormationDTO, TeamDTO } from '@football-manager/data-transfer';
import { Observable } from 'rxjs';

export interface HTTPParams { 
  [param: string]: string | number | boolean | readonly (string | number | boolean)[]; 
};

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  restApiVersion = 1;
  rootURL = `/api/${this.restApiVersion}`;

  championships(params? : HTTPParams) {
    const url = this.rootURL + '/championships';
    let httpParams = new HttpParams();
    if (params) httpParams = httpParams.appendAll(params);
    return this.http.get<ChampionshipDTO[]>(url, { params: httpParams });
  }

  formations(params? : HTTPParams) {
    const url = this.rootURL + '/formations';
    let httpParams = new HttpParams();
    if (params) httpParams = httpParams.appendAll(params);
    return this.http.get<FormationDTO[]>(url, { params: httpParams });
  }

  updateTeamFormation(teamId: number, formation: string) {
    const url = `${this.rootURL}/teams/formation`;
    const body = { teamId: teamId, formation: formation };
    return this.http.post<TeamDTO>(url, body);
  }
}
